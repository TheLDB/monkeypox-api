// * Standard Node Modules
import fs from "fs";

// * Third Party Libs
import puppeteer from "puppeteer"; // * Launch (Headless) Chromium browser & download CSV file
import { parse } from "@fast-csv/parse"; // * Parse CSV file from CDC
import { PrismaClient } from "@prisma/client"; // * Connect to Supabase and push data to DB
import { uuid } from "uuidv4";

const scrapeCountryData = async () => {
	const prisma = new PrismaClient();
	console.log("Loading the CDC site via Puppeteer");
	// * Launch browser and go to page
	const browser = await puppeteer.launch();

	// * Launch a new browser page and go to the CDC site
	const page = await browser.newPage();
	await page.goto("https://www.cdc.gov/poxvirus/monkeypox/response/2022/world-map.html");

	// * Create a Chromium DevTools instance and modify download behavior to download and use data CSV
	await page
		.target()
		.createCDPSession()
		.then((client) => {
			return client.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: "./data" });
		});

	// * Click download button and wait for it to download
	await page.waitForTimeout(2000);
	await page.click('[download="MPX-Country-Data.csv"]');
	await page.waitForTimeout(2000);

	// * Create a read stream on our new file and use @fast-csv/parse to parse it into usable, readable data
	const historicalDataArray: { id: any; country: any; caseCount: any; category: any; asOf: any; createdOn: any }[] = [];
	fs.createReadStream("./data/MPX-Country-Data.csv")
		.pipe(parse())
		.on("error", (error) => console.error(error))
		.on("data", async (row) => {
			// * row[0] = Country Name
			// * row[1] = Country Case Count
			// * row[2] = Status (Has reported historically?)
			// * row[3] = As of
			if (row[0] !== "Country") {
				const historicalDataObject = {
					id: uuid().toString(),
					country: row[0],
					caseCount: row[1],
					category: row[2],
					asOf: row[3],
					createdOn: new Date(),
				};

				historicalDataArray.push(historicalDataObject);

				await prisma.countryData
					.update({
						where: {
							country: row[0],
						},
						data: {
							caseCount: row[1],
							category: row[2],
							asOf: row[3],
							updatedOn: new Date(),
						}
					})
					.then((res) => console.log(res))
					.catch((e) => console.log(e));
			}
		})
		.on("end", async (rowCount: number) => {
			fs.unlinkSync("./data/MPX-Country-Data.csv");
			console.log(`Deleted the CSV file and parsed ${rowCount - 1} rows`);
			await prisma.historicalCountryData
				.createMany({
					data: historicalDataArray,
					skipDuplicates: true,
				})
				.then((res) => console.log(res))
				.catch((e) => console.log(e));
		});

	await browser.close();
	console.log("Grabbed data, closed browser");
};

export { scrapeCountryData };

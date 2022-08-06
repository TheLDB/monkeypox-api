// * Standard Node Modules
import fs from "fs";

// * Third Party Libs
import puppeteer from "puppeteer"; // * Launch (Headless) Chromium browser & download CSV file
import { parse } from "@fast-csv/parse"; // * Parse CSV file from CDC
import { PrismaClient } from "@prisma/client"; // * Connect to Supabase and push data to DB
import { uuid } from "uuidv4";

const scrapeStateData = async () => {
	const prisma = new PrismaClient();
	console.log("Loading the CDC site via Puppeteer");
	// * Launch browser and go to page
	const browser = await puppeteer.launch();

	// * Launch a new browser page and go to the CDC site
	const page = await browser.newPage();
	await page.goto("https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html");

	// * Create a Chromium DevTools instance and modify download behavior to download and use data CSV
	await page
		.target()
		.createCDPSession()
		.then((client) => {
			return client.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: "./data" });
		});

	// * Click download button and wait for it to download
	await page.click('[download="2022 U.S. Map & Case Count.csv"]');
	await page.waitForTimeout(2000);

	// * Create a read stream on our new file and use @fast-csv/parse to parse it into usable, readable data
	const historicalDataArray: { id: any; stateName: any; caseCount: any; caseRange: any; createdOn: any }[] = [];
	fs.createReadStream("./data/2022 U.S. Map & Case Count.csv")
		.pipe(parse())
		.on("error", (error) => console.error(error))
		.on("data", async (row) => {
			// * row[0] = State name
			// * row[1] = State cases
			// * row[2] = State case range

			if (row[0] !== "State") {
				// * Exclude the descriptor row since thats not needed

				// * Create historical data object to hold and push using createMany at end (to limit sql transactions)
				const historicalDataObject = {
					id: uuid().toString(),
					stateName: row[0],
					caseCount: row[1],
					caseRange: row[2],
					createdOn: new Date(),
				};

				historicalDataArray.push(historicalDataObject);

				await prisma.stateData
					.update({
						where: {
							state: row[0],
						},
						data: {
							caseCount: row[1],
							caseRange: row[2],
							createdOn: new Date(),
							updatedOn: new Date(),
						},
					})
					.then((res) => console.log(res))
					.catch((e) => console.log(e));
			}
		})
		.on("end", async (rowCount: number) => {
			fs.unlinkSync("./data/2022 U.S. Map & Case Count.csv");
			console.log(`Deleted the CSV file and parsed ${rowCount - 1} rows`);
			await prisma.historicalStateData
				.createMany({
					data: historicalDataArray,
					skipDuplicates: true,
				})
				.then((result) => console.log(result))
				.catch((e) => console.log(e));
		});

	await browser.close();
	console.log("Grabbed data, closed browser");
};

export { scrapeStateData };

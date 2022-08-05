import puppeteer from "puppeteer";
import fs from "fs";
import {parse} from '@fast-csv/parse';

const scrapeStateData = async () => {
	// Get the newest CSV blob link from the CDC (https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html) using Puppeteer
	// We're just going to grab the link then use node-fetch to pull it down because downloading files with puppeteer is like hell on earth.
	console.log("Loading the CDC site via Puppeteer");

	// * Launch browser and go to page
	const browser = await puppeteer.launch();

    // * Launch a new browser page and go to the CDC site
	const page = await browser.newPage();
	await page.goto("https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html");

    // * Create a Chromium DevTools instance and modify download behavior to download and use data CSV
    const setDownloadSettings = page.target().createCDPSession().then(client => {
        return client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './data'})
    });

    // * Click download button and wait for it to download
    const link = await page.click('[download="2022 U.S. Map & Case Count.csv"]');
    await page.waitForTimeout(2000);

    // * Get file using FS and set data var
    fs.createReadStream('./data/2022 U.S. Map & Case Count.csv')
        .pipe(parse())
        .on('error', error => console.error(error))
        .on('data', async row => {
            console.log(row[1])
        })
        .on('end', (rowCount: number) => {
            fs.unlinkSync('./data/2022 U.S. Map & Case Count.csv');
            console.log(`Deleted the CSV file and parsed ${rowCount} rows`)
        });

	await browser.close();
	console.log("Grabbed data, closed browser");
};

export default scrapeStateData;

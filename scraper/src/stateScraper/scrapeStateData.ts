import puppeteer from "puppeteer";
import http from "http";
import fs from "fs";
import axios from "axios";

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
    await page.waitForTimeout(6000);

	await browser.close();
	console.log("Grabbed data, closed browser");
};

export default scrapeStateData;

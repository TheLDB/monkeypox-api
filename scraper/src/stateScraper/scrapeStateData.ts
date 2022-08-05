import * as puppeteer from 'puppeteer';
import * as http from 'http';
import * as fs from 'fs';
import axios from 'axios';

const scrapeStateData = async () => {
    // Get the newest CSV blob link from the CDC (https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html) using Puppeteer
    // We're just going to grab the link then use node-fetch to pull it down because downloading files with puppeteer is like hell on earth.
    console.log("Loading the CDC site via Puppeteer")

    // * Launch browser and go to page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html");
    // * Launch browser and go to page

    // * Find the download button by the download attribute
    const link = await page.$('[download="2022 U.S. Map & Case Count.csv"]');
    // * Get the href value - unwrap into normal string from JSHandle
    const hrefAttribute = await link?.getProperty('href');
    const href: string | undefined = await hrefAttribute?.jsonValue();

    // * Open a writeStream with FS and download the file using http
    const monkeypoxDataFileStream = fs.createWriteStream("monkeypoxData.csv");


    await browser.close();
    console.log("Grabbed data, closed browser");
}

export default scrapeStateData;
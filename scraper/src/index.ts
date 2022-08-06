import { scrapeStateData } from './stateScraper/scrapeStateData';
import { scrapeCountryData } from './countryScraper/scrapeCountryData';

const scrapeData = async () => {
    await scrapeStateData();
    await scrapeCountryData();
}

scrapeData();
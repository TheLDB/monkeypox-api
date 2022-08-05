# Monkeypox Data Scraper

# About

## What is the Scraper?
This scraper is hosted on an AWS server and runs on a cronjob scheduler. It is scheduled to run 2 times a day, or every 12 hours.

On each run, it will pull Monkeypox data from the CDC and other government sites, and update the Supabase DB.

## What is Monkeypox?
[Monkeypox](https://www.cdc.gov/poxvirus/monkeypox/index.html) is a  is a rare disease caused by infection with the monkeypox virus. Monkeypox virus is part of the same family of viruses as variola virus, the virus that causes smallpox. Monkeypox symptoms are similar to smallpox symptoms, but milder, and monkeypox is rarely fatal. Monkeypox is not related to chickenpox.


## The "Stack"
- [Typescript](https://www.typescriptlang.org/)
- [Puppeteer](https://pptr.dev/)
- [@fast-csv/parse](https://www.npmjs.com/package/fast-csv)

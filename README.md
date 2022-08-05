# MonkeyPox API & Scraper
Written by [Landon Boles/TheLDB](https://github.com/TheLDB)


# About
## What is this API?
The Monkeypox API is a Fastify/Typescript API used for quick and easy access to worldwide stats of Monkeypox.

## What is the Scraper?
This scraper is hosted on an AWS server and runs on a cronjob scheduler. It is scheduled to run 2 times a day, or every 12 hours.

On each run, it will pull Monkeypox data from the CDC and other government sites, and update the Supabase DB.

## What is Monkeypox?
[Monkeypox](https://www.cdc.gov/poxvirus/monkeypox/index.html) is a  is a rare disease caused by infection with the monkeypox virus. Monkeypox virus is part of the same family of viruses as variola virus, the virus that causes smallpox. Monkeypox symptoms are similar to smallpox symptoms, but milder, and monkeypox is rarely fatal. Monkeypox is not related to chickenpox.

## Why does this API exist?
As the 2022 Monkeypox outbreak grows and spreads, an easy and open source access to the data surrounding it is super important.

## Why is the Scraper needed?
To avoid calling the CDC site and reparsing data every single time a user visits the site, we run a scraper indepdendently. This also helps with keeping historical data and creating comprehensive graphs.

# Folder Structure

## [api](./api/)
The api holds the fastify application which allows users to fetch data

## [scraper](/scraper/)
The scraper is a typescript app which runs on a cron job and scrapes government sites for monkeypox data every 12 hours
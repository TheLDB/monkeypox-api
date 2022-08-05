# MonkeyPox API
Written by [Landon Boles/TheLDB](https://github.com/TheLDB)


# About
## What is this API?
The Monkeypox API is a Fastify/Typescript API used for quick and easy access to worldwide stats of Monkeypox.

## What is Monkeypox?
[Monkeypox](https://www.cdc.gov/poxvirus/monkeypox/index.html) is a  is a rare disease caused by infection with the monkeypox virus. Monkeypox virus is part of the same family of viruses as variola virus, the virus that causes smallpox. Monkeypox symptoms are similar to smallpox symptoms, but milder, and monkeypox is rarely fatal. Monkeypox is not related to chickenpox.

## Why does this API exist?
As the 2022 Monkeypox outbreak grows and spreads, an easy and open source access to the data surrounding it is super important.

# Folder Structure

## [api](./api/)
The api holds the fastify application which allows users to fetch data

## [scraper](/scraper/)
The scraper is a typescript app which runs on a cron job and scrapes government sites for monkeypox data every 12 hours
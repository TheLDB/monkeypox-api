# MonkeyPox API
Written by [Landon Boles/TheLDB](https://github.com/TheLDB)


# About
## What is this API?
The Monkeypox API is a Fastify/Typescript API used for quick and easy access to worldwide stats of Monkeypox.

## What is Monkeypox?
[Monkeypox](https://www.cdc.gov/poxvirus/monkeypox/index.html) is a  is a rare disease caused by infection with the monkeypox virus. Monkeypox virus is part of the same family of viruses as variola virus, the virus that causes smallpox. Monkeypox symptoms are similar to smallpox symptoms, but milder, and monkeypox is rarely fatal. Monkeypox is not related to chickenpox.

## Why does this API exist?
As the 2022 Monkeypox outbreak grows and spreads, an easy and open source access to the data surrounding it is super important.

# How to use it

## Routes

### Global Stats
- Get a list of stats for every country
    - Method: ``GET``
    - Route: ``{api-domain-here}/stats/global``
    - Return Type: ``JSON``
- Get stats for a specific country
    - Method: ``GET``
    - Route: ``{api-domain-here}/stats/:country``
    - Return Type: ``JSON``
    - Find a list of every country & their code [here](docs/Countries.md)

### US Stats
- Get a list of stats for every state
    - Method: ``GET``
    - Route: ``{api-domain-here}/stats/us``
    - Return Type: ``JSON``
- Get stats for a specific state
    - Method: ``GET``
    - Route: ``{api-domain-here}/stats/us``
    - Return Type: ``JSON``
    - Find a list of every state & their code [here](docs/States.md)
- Get a list of stats for every county of a state
    - Method: ``GET``
    - Route: ``{api-domain-here}/stats/us/:state/counties``
    - Return Type: ``JSON``
- Get stats for a specific county
    - Method: ``GET``
    - Route: ``{api-domain-here}/stats/us/:state/:county``
    - Return Type: ``JSON``
    - Find a list of every state & their county [here](docs/States.md)
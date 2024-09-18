<a href="#gh-light-mode-only">
<img src="./.github/assets/logo-light.png">
</a>
<a href="#gh-dark-mode-only">
<img src="./.github/assets/logo.png">
</a>
  
# Lightrail Board

Lightrail Board is a tool for displaying realtime* lightrail data for a given stop on a easy to consume page, formatted similar to the real-life dynamic signage on the lightrail stops.

Specifically I created this project to both gain an understanding of the TransportNSW Data API and to have some way to show my possible next lightrail journey in my own home.

<small>* Realtime data requires a refresh of the page to update</small>

> [!CAUTION]
> This repository is a work-in-progress. Your mileage may vary.

![Lightrail Board Screenshot](./.github/assets/preview.png)

## Quickstart

The most convenient way to use this repository is to take the `docker-compose.yml` provided.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Open Data Hub API Key](https://opendata.transport.nsw.gov.au/get-started)

> [!WARNING]
> The fonts used in this project, specifically the NewFrank font, are not free for commercial use.
> These are BYO fonts, and are not included in this repository.

```sh
# Install docker and docker-compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
# Run the docker-compose
docker-compose up
```

This will start the application on port 3000.

## Development

To run the application locally, you will need to install the following:

- [Bun](https://bun.sh/)
- [Open Data Hub API Key](https://opendata.transport.nsw.gov.au/get-started)

```sh
# Install the appropriate dependencies
bun install
# Populate your API key in the `.env`
cp .env.example .env.local
# Run the application
bun dev
```
# Hobart Winds Dashboard

A simple weather dashboard showing wind conditions across the Hobart region, designed to help with sailing decisions.

## Quick Start

Due to BOM's CORS restrictions, you need to run a simple local server:

```bash
cd hobart-weather
python3 server.py
```

Then open http://localhost:8080 in your browser.

## Features

- **Map View**: Overview of all weather stations with wind arrows showing direction and speed
- **Station Cards**: Quick summary of conditions sorted by wind speed (best sailing first)
- **Detail Graphs**: Click any station for time-series graphs of:
  - Wind speed and gusts
  - Wind direction
  - Barometric pressure

## Data Sources

All data comes from the Bureau of Meteorology (BOM). The map covers every Tasmanian station on
https://www.bom.gov.au/tas/observations/tasall.shtml (49 stations) apart from the partner-network
sites (`99xxx` IDs), which have no published coordinates.

- The original 7 Hobart-area stations (Dennes Point, Hobart, Hobart Airport, kunanyi, Dunalley,
  Tasman Island, Cape Bruny) use the Hobart-area feed:
  `http://www.bom.gov.au/fwo/IDT60901/IDT60901.{STATION_ID}.json`
- All other stations use the Tasmania-wide feed:
  `http://www.bom.gov.au/fwo/IDT60801/IDT60801.{STATION_ID}.json`

Data updates every 10-30 minutes from BOM.

The map opens on the Hobart area; the "Last 3 hours" cards and their shared knots scale follow
whatever part of the map is on screen.

## Adding More Stations

1. Add the station to `STATION_LIST` in `stations.js` (used by `index.html` and `station.html`).
   Take lat/lon from BOM's station list (`/climate/data/lists_by_element/stations.txt`, match on
   the WMO column) - the feeds only give positions to 1 decimal place.
2. Add its ID to the matching product list in `worker.js` and redeploy the Worker **before**
   deploying the site.

The temperature / humidity / pressure comparison pages keep their own 7-station lists.

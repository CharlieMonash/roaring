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

All data comes from the Bureau of Meteorology (BOM):
- Hobart Airport
- Hobart (Ellerslie Road)
- kunanyi (Mt Wellington)
- Cape Bruny
- Geeveston
- Maatsuyker Island
- South Arm

Data updates every 10 minutes from BOM.

## Adding More Stations

To add more stations, find the station ID from BOM and add it to the `STATIONS` array in both `index.html` and `station.html`, plus add a position in `DEFAULT_POSITIONS`.

BOM station data format: `http://www.bom.gov.au/fwo/IDT60901/IDT60901.{STATION_ID}.json`

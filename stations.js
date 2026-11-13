// Shared station list for index.html and station.html.
//
// id       WMO number, as used in BOM feed URLs (IDT60x01.<id>.json)
// name     short label for map cards / tooltips
// fullName label for the station detail page
// lat/lon  from BOM's station list (IDCJMC0014) - the feeds only give 1 decimal place
// product  BOM feed: IDT60901 = Hobart area (the original 7), IDT60801 = Tasmania-wide
// home     the original 7 Hobart-area stations
//
// Any station added here must also be allowed in worker.js, then the worker redeployed.
// The temperature / humidity / pressure comparison pages keep their own 7-station lists.

const STATION_LIST = [
    // Original Hobart-area stations (unchanged feed)
    { id: '94988', name: 'Dennes Point', fullName: 'Dennes Point', lat: -43.0639, lon: 147.3567, product: 'IDT60901', home: true },
    { id: '94970', name: 'Hobart', fullName: 'Hobart (Ellerslie Road)', lat: -42.8897, lon: 147.3253, product: 'IDT60901', home: true },
    { id: '94619', name: 'Hobart Airport', fullName: 'Hobart Airport', lat: -42.8367, lon: 147.5042, product: 'IDT60901', home: true },
    { id: '95979', name: 'kunanyi', fullName: 'kunanyi (Mt Wellington)', lat: -42.8950, lon: 147.2408, product: 'IDT60901', home: true },
    { id: '94951', name: 'Dunalley', fullName: 'Dunalley (Stroud Point)', lat: -42.9017, lon: 147.7894, product: 'IDT60901', home: true },
    { id: '95986', name: 'Tasman Is.', fullName: 'Tasman Island', lat: -43.2397, lon: 148.0025, product: 'IDT60901', home: true },
    { id: '95967', name: 'Cape Bruny', fullName: 'Cape Bruny', lat: -43.4886, lon: 147.1444, product: 'IDT60901', home: true },

    // South & Hobart surrounds
    { id: '94961', name: 'Dover', fullName: 'Dover', lat: -43.3330, lon: 146.9980, product: 'IDT60801' },
    { id: '94962', name: 'Maatsuyker Is.', fullName: 'Maatsuyker Island', lat: -43.6578, lon: 146.2711, product: 'IDT60801' },
    { id: '94964', name: 'Bushy Park', fullName: 'Bushy Park', lat: -42.7097, lon: 146.8983, product: 'IDT60801' },
    { id: '94977', name: 'Hartz Mtns', fullName: 'Hartz Mountains', lat: -43.2006, lon: 146.7683, product: 'IDT60801' },
    { id: '95962', name: 'Warra', fullName: 'Warra', lat: -43.0609, lon: 146.7040, product: 'IDT60801' },
    { id: '95972', name: 'Campania', fullName: 'Campania', lat: -42.6867, lon: 147.4258, product: 'IDT60801' },
    { id: '95977', name: 'Grove', fullName: 'Grove', lat: -42.9844, lon: 147.0756, product: 'IDT60801' },
    { id: '95958', name: 'Scotts Peak', fullName: 'Scotts Peak', lat: -43.0425, lon: 146.2722, product: 'IDT60801' },
    { id: '95961', name: 'Low Rocky Pt', fullName: 'Low Rocky Point', lat: -42.9831, lon: 145.5025, product: 'IDT60801' },

    // East coast
    { id: '95987', name: 'Spring Bay', fullName: 'Spring Bay', lat: -42.5464, lon: 147.9308, product: 'IDT60801' },
    { id: '95988', name: 'Maria Island', fullName: 'Maria Island', lat: -42.6621, lon: 148.0179, product: 'IDT60801' },
    { id: '94981', name: 'Swansea', fullName: 'Swansea', lat: -42.1381, lon: 148.0736, product: 'IDT60801' },
    { id: '94987', name: 'Friendly Beaches', fullName: 'Friendly Beaches', lat: -41.9953, lon: 148.2794, product: 'IDT60801' },
    { id: '95989', name: 'Bicheno', fullName: 'Bicheno', lat: -41.8739, lon: 148.3036, product: 'IDT60801' },
    { id: '95975', name: 'Fingal', fullName: 'Fingal', lat: -41.6430, lon: 147.9800, product: 'IDT60801' },
    { id: '95981', name: 'St Helens', fullName: 'St Helens', lat: -41.3381, lon: 148.2792, product: 'IDT60801' },
    { id: '94983', name: 'Larapuna', fullName: 'Larapuna (Eddystone Point)', lat: -40.9928, lon: 148.3467, product: 'IDT60801' },
    { id: '95985', name: 'Swan Island', fullName: 'Swan Island', lat: -40.7292, lon: 148.1250, product: 'IDT60801' },

    // Midlands & central
    { id: '94960', name: 'Tunnack', fullName: 'Tunnack', lat: -42.4543, lon: 147.4612, product: 'IDT60801' },
    { id: '94957', name: 'Ouse', fullName: 'Ouse', lat: -42.4842, lon: 146.7106, product: 'IDT60801' },
    { id: '94959', name: 'Butlers Gorge', fullName: 'Butlers Gorge', lat: -42.2753, lon: 146.2758, product: 'IDT60801' },
    { id: '94985', name: 'Ross', fullName: 'Ross', lat: -42.0250, lon: 147.4954, product: 'IDT60801' },
    { id: '95959', name: 'Liawenee', fullName: 'Liawenee', lat: -41.8997, lon: 146.6694, product: 'IDT60801' },
    { id: '95970', name: 'Cressy', fullName: 'Cressy', lat: -41.7114, lon: 147.0820, product: 'IDT60801' },

    // North
    { id: '95966', name: 'Launceston Apt', fullName: 'Launceston Airport', lat: -41.5476, lon: 147.2156, product: 'IDT60801' },
    { id: '94969', name: 'Launceston', fullName: 'Launceston (Ti Tree Bend)', lat: -41.4194, lon: 147.1219, product: 'IDT60801' },
    { id: '94972', name: 'Scottsdale', fullName: 'Scottsdale', lat: -41.1708, lon: 147.4883, product: 'IDT60801' },
    { id: '95964', name: 'Low Head', fullName: 'Low Head', lat: -41.0547, lon: 146.7874, product: 'IDT60801' },
    { id: '94955', name: 'Sheffield', fullName: 'Sheffield', lat: -41.3890, lon: 146.3173, product: 'IDT60801' },
    { id: '95960', name: 'Devonport', fullName: 'Devonport Airport', lat: -41.1701, lon: 146.4289, product: 'IDT60801' },

    // North-west & west
    { id: '95963', name: 'Burnie', fullName: 'Burnie Port', lat: -41.0500, lon: 145.9149, product: 'IDT60801' },
    { id: '95957', name: 'Wynyard', fullName: 'Wynyard', lat: -40.9964, lon: 145.7311, product: 'IDT60801' },
    { id: '95956', name: 'Luncheon Hill', fullName: 'Luncheon Hill', lat: -41.1492, lon: 145.1517, product: 'IDT60801' },
    { id: '94953', name: 'Smithton', fullName: 'Smithton', lat: -40.8347, lon: 145.0847, product: 'IDT60801' },
    { id: '95954', name: 'Cape Grim', fullName: 'Kennaook / Cape Grim', lat: -40.6764, lon: 144.6922, product: 'IDT60801' },
    { id: '94950', name: 'Marrawah', fullName: 'Marrawah', lat: -40.9089, lon: 144.7094, product: 'IDT60801' },
    { id: '95952', name: 'Mount Read', fullName: 'Mount Read', lat: -41.8444, lon: 145.5417, product: 'IDT60801' },
    { id: '94956', name: 'Strahan', fullName: 'Strahan', lat: -42.1550, lon: 145.2908, product: 'IDT60801' },
    { id: '94974', name: 'Cape Sorell', fullName: 'Cape Sorell', lat: -42.1986, lon: 145.1700, product: 'IDT60801' },

    // Bass Strait islands
    { id: '94850', name: 'King Island', fullName: 'King Island Airport', lat: -39.8804, lon: 143.8857, product: 'IDT60801' },
    { id: '94980', name: 'Flinders Island', fullName: 'Flinders Island Airport', lat: -40.0911, lon: 148.0024, product: 'IDT60801' },
    { id: '94949', name: 'Hogan Island', fullName: 'Hogan Island', lat: -39.2225, lon: 146.9841, product: 'IDT60801' }
];

// Worker URL for the deployed site; the local python server proxies at /bom-proxy/
const WORKER_URL = 'https://d1-template.charliedixon49.workers.dev/';
const IS_LOCALHOST = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BOM_BASE = IS_LOCALHOST ? '/bom-proxy/' : WORKER_URL;

function stationUrl(station) {
    return `${BOM_BASE}${station.product}.${station.id}.json`;
}

function findStation(id) {
    return STATION_LIST.find(s => s.id === id) || null;
}

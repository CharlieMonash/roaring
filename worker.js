/**
 * Cloudflare Worker to proxy BOM API requests
 * Deploy this as a Cloudflare Worker, then update your HTML files to use the worker URL
 *
 * Two BOM products are proxied:
 *   IDT60901 - Hobart area observations (the original 7 stations)
 *   IDT60801 - Tasmania-wide observations (every station on bom.gov.au/tas/observations/tasall.shtml)
 * Requests look like /IDT60901.94970.json or /IDT60801.94962.json
 */

const BOM_ROOT = 'http://www.bom.gov.au/fwo/';

// Allowed station IDs per product (for security - only proxy known stations)
const ALLOWED = {
  IDT60901: [
    '94988', '94970', '94619', '95979', '94951', '95986', '95967'
  ],
  IDT60801: [
    '94619', '94850', '94949', '94950', '94951', '94953', '94955', '94956',
    '94957', '94959', '94960', '94961', '94962', '94964', '94969', '94970',
    '94972', '94974', '94977', '94980', '94981', '94983', '94985', '94987',
    '94988', '95952', '95954', '95956', '95957', '95958', '95959', '95960',
    '95961', '95962', '95963', '95964', '95966', '95967', '95970', '95972',
    '95975', '95977', '95979', '95981', '95985', '95986', '95987', '95988',
    '95989'
  ]
};

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    const path = url.pathname.slice(1); // Remove leading slash

    // Validate the request is for an allowed product + station
    const match = path.match(/^(IDT60901|IDT60801)\.(\d{5})\.json$/);
    if (!match || !ALLOWED[match[1]].includes(match[2])) {
      return new Response(JSON.stringify({ error: 'Invalid station' }), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }
    const product = match[1];

    try {
      // Fetch from BOM
      // Cache BOM's reply at Cloudflare's edge for 5 minutes so each visitor doesn't
      // trigger ~49 fresh requests to BOM (BOM itself updates every 10-30 minutes)
      const bomResponse = await fetch(`${BOM_ROOT}${product}/${path}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; WeatherDashboard/1.0)',
        },
        cf: { cacheTtl: 300, cacheEverything: true },
      });

      if (!bomResponse.ok) {
        throw new Error(`BOM returned ${bomResponse.status}`);
      }

      const data = await bomResponse.text();

      // Return with CORS headers
      return new Response(data, {
        headers: {
          ...CORS_HEADERS,
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: CORS_HEADERS,
      });
    }
  },
};

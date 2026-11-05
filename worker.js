/**
 * Cloudflare Worker to proxy BOM API requests
 * Deploy this as a Cloudflare Worker, then update your HTML files to use the worker URL
 */

const BOM_BASE = 'http://www.bom.gov.au/fwo/IDT60901/';

// Allowed station IDs (for security - only proxy known stations)
const ALLOWED_STATIONS = [
  'IDT60901.94988.json',
  'IDT60901.94970.json',
  'IDT60901.94619.json',
  'IDT60901.95979.json',
  'IDT60901.94951.json',
  'IDT60901.95986.json',
  'IDT60901.95967.json'
];

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

    // Validate the request is for an allowed station
    if (!ALLOWED_STATIONS.includes(path)) {
      return new Response(JSON.stringify({ error: 'Invalid station' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      // Fetch from BOM
      const bomResponse = await fetch(BOM_BASE + path, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; WeatherDashboard/1.0)',
        },
      });

      if (!bomResponse.ok) {
        throw new Error(`BOM returned ${bomResponse.status}`);
      }

      const data = await bomResponse.text();

      // Return with CORS headers
      return new Response(data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

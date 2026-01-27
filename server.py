#!/usr/bin/env python3
"""
Simple local server with BOM CORS proxy for Hobart Winds dashboard.
Run: python3 server.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import urllib.request
import json
from urllib.parse import urlparse, parse_qs

PORT = 8080

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle BOM proxy requests
        if self.path.startswith('/bom-proxy/'):
            self.proxy_bom_request()
        else:
            # Serve static files normally
            super().do_GET()

    def proxy_bom_request(self):
        """Proxy requests to BOM API to avoid CORS issues"""
        try:
            # Extract the station ID from the path
            # e.g., /bom-proxy/IDT60901.94988.json
            bom_path = self.path.replace('/bom-proxy/', '')
            bom_url = f'http://www.bom.gov.au/fwo/IDT60901/{bom_path}'

            # Make request to BOM
            req = urllib.request.Request(bom_url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })

            with urllib.request.urlopen(req, timeout=10) as response:
                data = response.read()

                # Send response with CORS headers
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def log_message(self, format, *args):
        """Quieter logging"""
        if '/bom-proxy/' in args[0]:
            print(f"[BOM] {args[0]}")
        elif not args[0].endswith('.js') and not args[0].endswith('.css'):
            print(f"[Static] {args[0]}")


if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
        print(f"Hobart Winds server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down...")

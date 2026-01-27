# Deploying Roaring to Cloudflare

## Overview
You'll deploy two things:
1. **Cloudflare Worker** - Proxies BOM API requests (avoids CORS issues)
2. **Cloudflare Pages** - Hosts the static HTML/JS files

## Step 1: Create a Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Create a free account (no credit card needed)

## Step 2: Deploy the Worker (API Proxy)

1. Go to **Workers & Pages** in the Cloudflare dashboard
2. Click **Create Application** → **Create Worker**
3. Give it a name like `roaring-proxy`
4. Click **Deploy** (this creates a basic worker)
5. Click **Edit Code**
6. Delete everything and paste the contents of `worker.js`
7. Click **Save and Deploy**
8. Note your worker URL - it will look like: `https://roaring-proxy.YOUR-SUBDOMAIN.workers.dev`

## Step 3: Update Your HTML Files

In each of these files, find the line:
```javascript
const WORKER_URL = 'YOUR_WORKER_URL_HERE';
```

Replace `YOUR_WORKER_URL_HERE` with your actual worker URL (include trailing slash):
```javascript
const WORKER_URL = 'https://roaring-proxy.YOUR-SUBDOMAIN.workers.dev/';
```

Files to update:
- `index.html`
- `station.html`
- `pressure.html`

## Step 4: Deploy to Cloudflare Pages

### Option A: Direct Upload (Easiest)
1. Go to **Workers & Pages** → **Create Application** → **Pages**
2. Click **Upload assets**
3. Name your project (e.g., `roaring`)
4. Drag and drop these files:
   - `index.html`
   - `station.html`
   - `pressure.html`
5. Click **Deploy**
6. Your site will be live at `https://roaring.pages.dev` (or similar)

### Option B: Connect to GitHub (Auto-deploys on push)
1. Push your files to a GitHub repository
2. Go to **Workers & Pages** → **Create Application** → **Pages**
3. Click **Connect to Git**
4. Select your repository
5. Build settings: Leave blank (no build needed)
6. Click **Save and Deploy**

## Done!
Your site should now be live. Access it from anywhere at your Cloudflare Pages URL.

## Custom Domain (Optional)
1. In your Pages project, go to **Custom domains**
2. Add your domain (e.g., `roaring.yourdomain.com`)
3. Follow the DNS instructions

## Troubleshooting

**"Unable to fetch BOM data" error:**
- Check that your Worker URL is correct (with trailing slash)
- Check the Worker is deployed and running (visit the Worker URL directly)

**Data not loading:**
- Open browser dev tools (F12) → Network tab
- Look for failed requests to your worker URL
- Check the Console for errors

**Local development still works:**
- The code auto-detects localhost and uses the Python proxy
- Run `python3 server.py` for local testing

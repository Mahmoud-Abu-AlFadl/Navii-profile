/**
 * Navii Website — Backend Server
 *
 * A lightweight Node.js static file server that serves the frontend.
 * No external dependencies required — uses only built-in Node.js modules.
 *
 * Usage:
 *   node server.js
 *   node server.js --port=8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// =========================================
// Configuration
// =========================================
const DEFAULT_PORT = 3000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

// Parse --port flag from CLI args
const portArg = process.argv.find((arg) => arg.startsWith('--port='));
const PORT = portArg ? parseInt(portArg.split('=')[1], 10) : DEFAULT_PORT;

// MIME type mapping for common file extensions
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
};


// =========================================
// Request Handler
// =========================================
function handleRequest(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // Parse URL and resolve file path
  let urlPath = req.url.split('?')[0]; // strip query params
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(FRONTEND_DIR, urlPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(FRONTEND_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Determine MIME type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 — Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 — Internal Server Error');
      }
      return;
    }

    // Cache static assets (CSS, JS, images) for 1 hour
    const cacheHeaders = ext === '.html'
      ? { 'Cache-Control': 'no-cache' }
      : { 'Cache-Control': 'public, max-age=3600' };

    res.writeHead(200, {
      'Content-Type': contentType,
      ...cacheHeaders,
    });
    res.end(data);
  });
}


// =========================================
// Start Server
// =========================================
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`\n  ✨ Navii Website Server`);
  console.log(`  ──────────────────────`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Serving: ${FRONTEND_DIR}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n  Server stopped.\n');
  server.close();
  process.exit(0);
});

'use strict';

// Local dev server: serves the static site and delegates /api/ideas to the
// shared handler (local drafts persist to .data/drafts.json).
// Run: node server.js  ->  http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleRequest } = require('./lib/http-api.js');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (pathname === '/api/ideas') {
    try {
      return await handleRequest(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  let filePath = path.normalize(path.join(ROOT, pathname === '/' ? 'index.html' : pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(ROOT, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Sanity Lifters → http://localhost:${PORT}`);
});

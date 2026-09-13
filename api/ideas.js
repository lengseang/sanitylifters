'use strict';

// Vercel serverless function: GET/POST/DELETE /api/ideas
// Reads ideas/*.md and Vercel KV drafts. Mutation requires ADMIN_PASSCODE.

const { handleRequest } = require('../lib/http-api.js');

module.exports = function handler(req, res) {
  return handleRequest(req, res);
};

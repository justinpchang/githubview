var express = require('express');
var router = express.Router();

const fs = require('fs');
const get = require('get-file');

// Send file to client
// Uses query param filepath (base-64 encoding)
// For testing: .gitignore (base64) => LmdpdGlnbm9yZQ==
router.get('/:user/:repo', (req, res) => {
  // TODO: add verification
  const filepath = Buffer.from(req.query.filepath, 'base64').toString('ascii');
  get(`${req.params.user}/${req.params.repo}`, filepath, (err, data) => {
    if (err) return console.error(err);
    data.pipe(res);
    return;
  });
});

module.exports = router;
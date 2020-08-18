var express = require('express');
var router = express.Router();
const trees = require('github-trees');

require('dotenv').config()

const opts = {
  recursive: true,
  username: process.env.USERNAME, // To run, need to populate server/.env with USERNAME and PASSWORD vals
  password: process.env.PASSWORD
}

// Send formatted document tree for client
// Refer for json formatting: https://gist.github.com/justinpchang/c0e68fb529650021e5d55516d11a0d9b
router.get('/:user/:repo', function(req, res, next) {
  trees(`${req.params.user}/${req.params.repo}`, opts)
    .then((data) => {
      let obj = { files: [] };
      for (file of data.tree) {
        if (file.type !== 'tree') {
          obj.files.push({
          key: file.path
          });
        }

      }
      res.send(obj);
    })
    .catch(console.error);
});

module.exports = router;

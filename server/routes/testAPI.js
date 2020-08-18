var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('API is working properly maybe? this is meant to be testAPI');
});

module.exports = router;
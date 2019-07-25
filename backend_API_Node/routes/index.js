var express = require('express');
var router = express.Router();

var usersData = require('../database/data');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('API - za urnik');
});

module.exports = router;
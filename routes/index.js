var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var router = express.Router();
var staffOp = require('../operation/staffOp')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

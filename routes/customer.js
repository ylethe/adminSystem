var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var router = express.Router();
var customerOp = require('../operation/customerOp')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/list', (req, res) => {
  customerOp.getCustomer(req, res)
})

router.post('/detail', (req, res) => {
  customerOp.getCustomerDetail(req, res)
})

router.post('/update', (req, res) => {
  customerOp.updateCustomer(req, res)
})
module.exports = router;

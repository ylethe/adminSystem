var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var staffOp = require('../operation/staffOp')

router.post('/login', function (req, res) {
  staffOp.login(req, res);
})

router.post('/reset-password', (req, res) => {
  staffOp.resetPassword(req, res);
})
module.exports = router;
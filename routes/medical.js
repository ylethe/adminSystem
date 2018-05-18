var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var medicalOp = require('../operation/medicalOp')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
  next()
});

router.get('/list', (req, res) => {
  medicalOp.getMedicalList(req, res);
});

router.post('/out', (req, res) => {
  medicalOp.medicalOut(req, res)
});

router.get('/out-list', (req, res) => {
  medicalOp.getOutList(req, res);
})

router.post('/detail', (req, res) => {
  console.log(5555)
  medicalOp.getMedicalDetail(req, res)
});

router.post('/delete', (req, res) => {
  medicalOp.deleteMedical(req, res)
})

router.post('/update', (req, res) => {
  medicalOp.updateMedical(req, res)
})
module.exports = router;
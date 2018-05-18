var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var router = express.Router();
var taskOp = require('../operation/taskOp')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next()
});

router.get('/list', (req, res) => {
  taskOp.getTask(req, res);
})

router.post('/add', (req, res) => {
  taskOp.addTask(req, res);
})

router.post('/complete', (req, res) => {
  taskOp.completeTask(req, res);
})

router.post('/delete', (req, res) => {
  taskOp.deleteTask(req, res);
})

module.exports = router;

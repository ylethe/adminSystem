var mysql = require('mysql');
var $conf = require('../db/dbConfig');
var $sql = require('../db/taskSql');
var jsonWrite = require('./jsonWrite');

var pool  = mysql.createPool($conf.mysql);

module.exports = {
  // 获取任务列表
  getTask (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryByUser, +req.query.userId, (err, result) => {
        jsonWrite(res, err, result);
        connection.release();
      })
    })
  },
  // 添加任务
  addTask (req, res) {
    pool.getConnection((err, connection) => {
      const data = [
        null,
        req.body.userId,
        req.body.title,
        req.body.startDate,
        req.body.endDate,
        req.body.content,
        0,
        0
      ]
      connection.query($sql.insert, data, (err, result) => {
        jsonWrite(res, err, result);
        connection.release();
      })
    })
  },
  // 完成任务
  completeTask (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.complete, +req.body.id, (err, result) => {
        jsonWrite(res, err, result);
        connection.release();
      })
    })
  },
  // 删除任务
  deleteTask (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.delete, +req.body.id, (err, result) => {
        jsonWrite(res, err, result);
        connection.release();
      })
    })
  }
};
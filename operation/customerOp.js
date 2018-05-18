var mysql = require('mysql');
var $conf = require('../db/dbConfig');
var $sql = require('../db/customerSql');
var jsonWrite = require('./jsonWrite');

var pool  = mysql.createPool($conf.mysql);

module.exports = {
  getCustomer (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryAll, (err, result) => {
        jsonWrite(res, err, result)
      })
    })
  },
  getCustomerDetail (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryById, +req.body.id, (err, result) => {
        jsonWrite(res, err, result[0])
      })
    })
  },
  updateCustomer (req, res) {
    pool.getConnection((err, connection) => {
      let sqlName = ''
      let data = []
      if (req.body.id) {
        sqlName = 'update'
        data = [
         req.body.name,
         req.body.medicalNo,
         req.body.producotor,
         req.body.productionDate,
         req.body.medicalType,
         req.body.count,
         req.body.comment,
         +req.body.id
        ]
      } else {
        sqlName = 'insert'
        data = [
          null,
          req.body.name,
          req.body.medicalNo,
          req.body.producotor,
          req.body.productionDate,
          null,
          req.body.medicalType,
          req.body.count,
          null,
          null,
          req.body.comment
        ]
      }
      // 建立连接，向表中插入／更新值
      connection.query($sql[sqlName], data, (err, result) => {
        jsonWrite(res, err, result);
        // 释放连接
        connection.release();
      });
    })
  }
}

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
      const lifePhoto = req.body.lifePhoto || ''

      if (req.body.id) {
        sqlName = 'update'
        data = [
          req.body.name,
          req.body.name,
          req.body.sex,
          req.body.tel,
          req.body.address,
          req.body.birthday,
          req.body.comment,
          `${lifePhoto}`
         +req.body.id
        ]
      } else {
        sqlName = 'insert'
        data = [
          null,
          req.body.name,
          req.body.sex,
          req.body.tel,
          req.body.address,
          req.body.birthday,
          req.body.comment,
          lifePhoto
        ]
      }
      console.log(req.body, data, 555)
      // 建立连接，向表中插入／更新值
      connection.query($sql[sqlName], data, (err, result) => {
        console.log(err, result, 444)
        jsonWrite(res, err, result);
        // 释放连接
        connection.release();
      });
    })
  }
}

var mysql = require('mysql');
var $conf = require('../db/dbConfig');
var $sql = require('../db/medicalSql');
var jsonWrite = require('./jsonWrite')

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
  updateMedical (req, res) {
    // 获取数据库连接池
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
    });
  },
  getMedicalList (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryAll, (err, result) => {
        jsonWrite(res, err, result);
      })
    })
  },
  getOutList (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryOut, (err, result) => {
        jsonWrite(res, err, result);
      })
    })
  },
  getMedicalDetail (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryById, +req.body.id, (err, result) => {
        jsonWrite(res, err, result[0])
      })
    })
  },
  medicalOut (req, res) {
    pool.getConnection((err, connection) => {
      const data = [
        null,
        req.body.name,
        req.body.medicalNo,
        req.body.productor,
        req.body.productionDate,
        req.body.outDate,
        req.body.medicalType,
        req.body.outCount
      ]
      console.log(req.body, data, 111)
      connection.query($sql.medicalOut, data, (err, result) => {
        console.log(err, result)
      })
      console.log(req.body.outCount, 222)
      connection.query($sql.setMedicalOut, [
        req.body.count,
        req.body.outDate,
        req.body.outCount,
        req.body.medicalId
      ],
        (err, result) => {
          jsonWrite(res, err, result)
      })
    })
  },
  deleteMedical (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.delete, +req.body.id, (err, result) => {
        jsonWrite(res, err, result)
      })
    })
  }

};

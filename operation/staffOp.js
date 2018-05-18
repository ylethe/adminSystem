var mysql = require('mysql');
var $conf = require('../db/dbConfig');
var $sql = require('../db/staffSql');
var jsonWrite = require('./jsonWrite');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

module.exports = {
  // 登录
  login (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.login, req.body.userName, (err, result) => {
        let obj = {}
        const password = result[0].password
        if (result && req.body.password === password) {
          obj = {
            code: 0,
            data: {
              userId: result[0].id,
              userName: result[0].userName
            },
            msg: '登录成功'
          }
        } else if (result && req.body.password !== password) {
          obj = {
            code: 1,
            data: null,
            msg: '密码错误'
          }
        } else if (!result) {
          obj = {
            code: 2,
            data: null,
            msg: '用户没权限'
          }
        }
        jsonWrite(res, err, obj, 1)
        connection.release();
      });
    });
  },
  // 修改密码
  updatePassword (req, res) {
    poo.getConnection((err, connection) => {
      connection.query($sql.resetPassword, [req.body.password, +req.body.id], (err, result) => {
        jsonWrite(res, err, result);
        connection.release();
      })
    })
  },
  // 添加或更新员工信息
  updateStaff (req, res) {
    pool.getConnection((err, connection) => {
      let sqlName = ''
      let data = []
      if (req.body.id) {
        sqlName = 'update'
        data = [
         req.body.userName,
         req.body.tel,
         req.body.post,
         req.body.sex,
         req.body.idCard,
         req.body.joinDate,
         req.body.comment,
         req.body.lifePhoto,
         +req.body.id
        ]
      } else {
        sqlName = 'insert'
        data = [
          req.body.id,
          req.body.userName,
          req.body.password,
          req.body.tel,
          req.body.post,
          req.body.sex,
          req.body.idCard,
          req.body.joinDate,
          req.body.comment,
          req.body.lifePhoto,
          req.body.isAdmin
        ]
      }
      // 建立连接，向表中插入／更新值
      connection.query($sql[sqlName], data, (err, result) => {
        jsonWrite(res, err, result);
        // 释放连接
        connection.release();
      });
    });
    return useIdCount;
  },
  // 获取员工列表
  getStaffList (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryAll, (err, result) => {
        jsonWrite(res, err, result);
      })
    })
  },
  // 获取员工详细信息
  getStaffDetail (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.queryById, +req.body.id, (err, result) => {
        jsonWrite(res, err, result[0])
      })
    })
  },
  // 设置管理员
  setAdmin (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.setAdmin, [1, +req.body.id], (err, result) => {
        jsonWrite(res, err, result);
      })
    })
  },
  // 删除员工
  delete (req, res) {
    pool.getConnection((err, connection) => {
      connection.query($sql.delete, +req.body.id, (err, result) => {
        jsonWrite(res, err, result)
      })
    })
  }
};
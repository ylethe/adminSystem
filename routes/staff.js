var express = require('express');
var router = express.Router();
var staffOp = require('../operation/staffOp') // 引入员工操作函数对象

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
  next()
});

// 查询员工列表
router.get('/list', (req, res) => {
  staffOp.getStaffList(req, res);
});

// 通过id查询员工信息
router.post('/detail', (req, res) => {
  staffOp.getStaffDetail(req, res);
});

// 添加或更新员工信息
router.post('/update', (req, res) => {
  staffOp.updateStaff(req, res);
});

//　将员工设为管理员
router.post('/set-admin', (req, res) => {
  staffOp.setAdmin(req, res);
});

// 删除员工
router.post('/delete', (req, res) => {
  staffOp.delete(req, res);
});

module.exports = router;
// 向前台返回JSON方法的简单封装
const jsonWrite = function (res, err, result, type) {
  let obj = {}
  if (err) {
    obj = {
      code: err.errno,
      data: null,
      msg: err.sqlMessage
    }
  } else {
    // 自定义返回
    if (type) {
      return res.json(result)
    }
    // 统一返回
    obj = {
      code: 0,
      data: result,
      msg: ''
    }
  }
  return res.json(obj);
};

module.exports = jsonWrite;
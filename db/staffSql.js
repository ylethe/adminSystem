const staff = {
  insert: 'insert into staff values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  update: 'update staff set userName=?, tel=?, post=?, sex=?, idCard=?, joinDate=?, comment=?, lifePhoto=? where id=?',
  login: 'select * from staff where userName=?',
  resetPassword: 'update staff set password=? where id=?',
  setAdmin: 'update staff set isAdmin=?, password=? where id=?',
  delete: 'delete from staff where id=?',
  queryById: 'select * from staff where id=?',
  queryAll: 'select * from staff'
}

module.exports = staff;
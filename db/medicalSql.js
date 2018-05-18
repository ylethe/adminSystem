const medical = {
  insert: 'insert into medical values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  delete: 'delete from medical where id=?',
  queryById: 'select * from medical where id=?',
  update: 'update medical set name=?, medicalNo=?, producotor=?, productionDate=?, medicalType=?, count=?,comment=? where id=?',
  queryAll: 'select * from medical where count>0',
  setMedicalOut: 'update medical set count=?, outDate=?, outCount=? where id=?',
  queryOut: 'select * from outMedical',
  medicalOut: 'insert into outMedical values(?, ?, ?, ?, ?, ?, ?, ?)'
}

module.exports = medical;

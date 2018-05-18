const task = {
  insert: 'insert into task values(?, ?, ?, ?, ?, ?, ?, ?)',
  complete: 'update task set isComplete=1 where id=?',
  delete: 'delete from task where id=?',
  queryByUser: 'select * from task where userId=?'
}
  
module.exports = task;

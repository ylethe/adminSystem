const customer = {
    insert: 'insert into customer values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    update: 'update customer set userName=?, tel=?, post=?, sex=?, idCard=?, joinDate=?, comment=?, lifePhoto=? where id=?',
    queryById: 'select * from customer where id=?',
    queryAll: 'select * from customer'
  }
  
  module.exports = customer;
const customer = {
    insert: 'insert into customer values(?, ?, ?, ?, ?, ?, ?, ?)',
    update: 'update customer set name=?, sex=?, name=?, tel=?, address=?, birthday=?, comment=?, lifePhoto=? where id=?',
    queryById: 'select * from customer where id=?',
    queryAll: 'select * from customer'
  }
  
  module.exports = customer;
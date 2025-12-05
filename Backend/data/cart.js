const ids = require('./ids');

module.exports = [
  {
    cartId: ids.CART_ZAPP,
    customerId: ids.CUSTOMER_ZAPP, 
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartId: ids.CART_LEIA,
    customerId: ids.CUSTOMER_LEIA, 
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartId: ids.CART_RICK,
    customerId: ids.CUSTOMER_RICK, 
    status: 'abandoned',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartId: ids.CART_GROOT,
    customerId: ids.CUSTOMER_GROOT, 
    status: 'converted',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
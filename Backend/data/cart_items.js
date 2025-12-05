const { v4: uuidv4 } = require('uuid');
const ids = require('./ids');

module.exports = [
  {
    cartItemId: uuidv4(),
    cartId: ids.CART_ZAPP,
    petId: ids.PET_TIMMY, 
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartItemId: uuidv4(),
    cartId: ids.CART_ZAPP,
    petId: ids.PET_FLUFFY, 
    quantity: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartItemId: uuidv4(),
    cartId: ids.CART_LEIA,
    petId: ids.PET_NIBBLER, 
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartItemId: uuidv4(),
    cartId: ids.CART_RICK,
    petId: ids.PET_GARY, 
    quantity: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    cartItemId: uuidv4(),
    cartId: ids.CART_GROOT,
    petId: ids.PET_STITCH, 
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
'use strict';

const cart_items = require('../data/cart_items');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cart_Items', cart_items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cart_Items', null, {});
  }
};
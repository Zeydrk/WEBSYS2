'use strict';

const cart_items = require('../data/cart_items');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart_items', cart_items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart_items', null, {});
  }
};
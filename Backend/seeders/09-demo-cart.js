'use strict';

const carts = require('../data/cart');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('carts', carts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('carts', null, {});
  }
};
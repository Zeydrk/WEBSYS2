'use strict';

const order_pets = require('../data/order_pets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('order_pets', order_pets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('order_pets', null, {});
  }
};
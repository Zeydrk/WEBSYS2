'use strict';

const order_pets = require('../data/order_pets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Order_Pets', order_pets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Order_Pets', null, {});
  }
};
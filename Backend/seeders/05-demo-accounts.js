'use strict';

const accounts = require('../data/accounts');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', accounts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
'use strict';

const logistics = require('../data/logistics');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('logistics', logistics, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('logistics', null, {});
  }
};
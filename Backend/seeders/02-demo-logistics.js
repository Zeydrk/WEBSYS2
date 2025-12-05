'use strict';

const logistics = require('../data/logistics');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logistics', logistics, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Logistics', null, {});
  }
};
'use strict';

const species_manager = require('../data/species_manager.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('species_manager', species_manager, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('species_manager', null, {});
  }
};
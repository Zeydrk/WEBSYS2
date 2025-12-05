'use strict';

const species_manager = require('../data/species_manager');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('species_managers', species_manager, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('species_managers', null, {});
  }
};
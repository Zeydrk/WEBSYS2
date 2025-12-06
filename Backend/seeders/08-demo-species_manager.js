'use strict';

const species_manager = require('../data/species_manager');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Species_Managers', species_manager, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Species_Managers', null, {});
  }
};
'use strict';

const pets = require('../data/pets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pets', pets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pets', null, {});
  }
};
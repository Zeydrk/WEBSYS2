'use strict';

const pets = require('../data/pets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pets', pets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pets', null, {});
  }
};
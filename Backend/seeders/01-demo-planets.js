'use strict';

const planets = require('../data/planets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Planets', planets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Planets', null, {});
  }
};
'use strict';

const planets = require('../data/planets');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('planets', planets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('planets', null, {});
  }
};
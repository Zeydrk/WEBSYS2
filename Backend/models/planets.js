'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Planets extends Model {
    static associate(models) {
      // A Planet is the origin for many Pets
      Planets.hasMany(models.Pets, {
        foreignKey: 'planetId',
        as: 'nativePets'
      });
    }
  }
  Planets.init({
    planetId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    planetName: DataTypes.STRING,
    distanceFromSun: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Planets',
  });
  return Planets;
};
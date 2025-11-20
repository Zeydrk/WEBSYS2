'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species_Manager extends Model {
    static associate(models) {
      // A Species Manager belongs to one Pet species
      Species_Manager.belongsTo(models.Pets, {
        foreignKey: 'petId',
        as: 'managedSpecies'
      });
    }
  }
  Species_Manager.init({
    managerId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    petId: DataTypes.UUID,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Species_Manager',
  });
  return Species_Manager;
};
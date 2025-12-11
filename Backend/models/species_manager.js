'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Species_Manager extends Model {
    static associate(models) {
    Species_Manager.belongsTo(models.Account, { 
        foreignKey: 'accountId',
        as: 'account'
      });
    }
  }
  Species_Manager.init({
    managerId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Species_Manager',
  });
  return Species_Manager;
};
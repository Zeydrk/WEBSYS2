'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
  Account.hasOne(models.Customer, { 
    foreignKey: 'accountId' 
  });
  Account.hasOne(models.Species_Manager, { 
    foreignKey: 'accountId' 
  });
    }
  }

  Account.init({
    accountId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50]
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'Accounts',
  });

  return Account;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Orders, {
        foreignKey: 'customerId',
        as: 'orders'
      });
      
      Customer.belongsTo(models.Planets, {
          foreignKey: 'planetId',
          as: 'planet'
        });
      
      Customer.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account'
      });      
    }
  }
  Customer.init({
    customerId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    planetId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: { isEmail: true } 
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
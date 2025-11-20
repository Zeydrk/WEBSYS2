'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logistics extends Model {
    static associate(models) {
      // A Logistics service can handle many Orders
      Logistics.hasMany(models.Orders, {
        foreignKey: 'logisticsId',
        as: 'handledOrders'
      });
    }
  }
  Logistics.init({
    logisticsId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    delivery_rate: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Logistics',
  });
  return Logistics;
};
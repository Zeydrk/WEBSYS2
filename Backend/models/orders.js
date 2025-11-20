'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      // An Order belongs to a Customer (FK: customerId)
      Orders.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });

      // An Order belongs to a Logistics service (FK: logisticsId)
      Orders.belongsTo(models.Logistics, {
        foreignKey: 'logisticsId',
        as: 'logisticsProvider'
      });

      // Many-to-Many relationship with Pets through Order_Pets
      Orders.belongsToMany(models.Pets, {
        through: models.Order_Pets,
        foreignKey: 'orderId',
        otherKey: 'petId',
        as: 'items' // To get pets in the order
      });
    }
  }
  Orders.init({
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    customerId: DataTypes.UUID,
    logisticsId: DataTypes.UUID,
    orderDate: DataTypes.DATE,
    status: DataTypes.STRING,
    totalCost: DataTypes.DECIMAL,
    deliveryPlanet: DataTypes.STRING,
    estimatedDeliveryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
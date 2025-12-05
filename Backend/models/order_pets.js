'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Pets extends Model {
    static associate(models) {
      // Order_Pets belongs to an Order
      Order_Pets.belongsTo(models.Orders, {
        foreignKey: 'orderId'
      });
      // Order_Pets belongs to a Pet
      Order_Pets.belongsTo(models.Pets, {
        foreignKey: 'petId'
      });
    }
  }
  Order_Pets.init({
    orderSpeciesId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    petId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    speciesBaseCost: DataTypes.DECIMAL,
    transportCostApplied: DataTypes.DECIMAL,
    finalItemCost: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Order_Pets',
    
    indexes: [{
      unique: true,
      fields: ['orderId', 'petId']
    }]
  });
  return Order_Pets;
};
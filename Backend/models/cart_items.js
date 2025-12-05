'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    static associate(models) {
      // Link back to the Cart
      Cart_Item.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
      });

      // Link to the Product (Pets)
      Cart_Item.belongsTo(models.Pets, { 
        foreignKey: 'petId',
        as: 'pet'
      });
    }
  }

  Cart_Item.init({
    cartItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    petId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    }
  }, {
    sequelize,
    modelName: 'Cart_Item',
    tableName: 'Cart_Items',
  });

  return Cart_Item;
};
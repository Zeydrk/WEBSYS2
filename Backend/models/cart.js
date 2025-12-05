'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // A Cart belongs to a Customer
      Cart.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });

      // A Cart has many Cart Items
      Cart.hasMany(models.Cart_Item, {
        foreignKey: 'cartId',
        as: 'items'
      });
    }
  }

  Cart.init({
    cartId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'abandoned', 'converted']]
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
  });

  return Cart;
};
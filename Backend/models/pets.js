'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    static associate(models) {
      // A Pet species belongs to one Planet
      Pets.belongsTo(models.Planet, {
        foreignKey: 'planetId',
        as: 'originPlanet'
      });

      // A Pet species has many Species Managers
      Pets.hasMany(models.Species_Manager, {
        foreignKey: 'petId',
        as: 'managers'
      });

      // Many-to-Many relationship with Orders through Order_Pets
      Pets.belongsToMany(models.Orders, {
        through: models.Order_Pets,
        foreignKey: 'petId',
        otherKey: 'orderId',
        as: 'orders'
      });
    }
  }
  Pets.init({
    petId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    planetId: DataTypes.UUID,
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    description: DataTypes.TEXT,
    basePrice: DataTypes.DECIMAL,
    stockQty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pets',
  });
  return Pets;
};
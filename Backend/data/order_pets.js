const { v4: uuidv4 } = require('uuid');
const ids = require('./ids');

module.exports = [
  {
    orderSpeciesId: uuidv4(),
    orderId: ids.ORDER_1,
    petId: ids.PET_TIMMY,
    quantity: 1,
    speciesBaseCost: 500.00,
    transportCostApplied: 50.00,
    finalItemCost: 550.00,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderSpeciesId: uuidv4(),
    orderId: ids.ORDER_1,
    petId: ids.PET_FLUFFY,
    quantity: 2, 
    speciesBaseCost: 25.50, 
    transportCostApplied: 10.00,
    finalItemCost: 71.00,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderSpeciesId: uuidv4(),
    orderId: ids.ORDER_2,
    petId: ids.PET_PORGIE,
    quantity: 1,
    speciesBaseCost: 120.00,
    transportCostApplied: 20.00,
    finalItemCost: 140.00,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
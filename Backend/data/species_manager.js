const { v4: uuidv4 } = require('uuid');
const ids = require('./ids');

module.exports = [
  {
    managerId: uuidv4(), 
    petId: ids.PET_TIMMY,
    name: 'Dr. Xarlais Zorg',
    role: 'Void Entity Specialist',
    email: 'zorg@intergalacticzootech.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    managerId: uuidv4(),
    petId: ids.PET_TOOTHLESS, 
    name: 'Hiccup Haddock',
    role: 'Dragon Rider',
    email: 'hiccup@berk.org',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    managerId: uuidv4(),
    petId: ids.PET_FLUFFY,
    name: 'Cyrano Jones',
    role: 'Small Mammal Trader',
    email: 'sales@tribbles4u.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
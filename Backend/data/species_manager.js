const { v4: uuidv4 } = require('uuid');
const ids = require('./ids');

module.exports = [
  {
    managerId: uuidv4(), 
    petId: ids.PET_TIMMY,
    name: 'Dr. Xarlais Zorg',
    email: 'zorg@intergalacticzootech.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    managerId: uuidv4(),
    petId: ids.PET_TOOTHLESS, 
    name: 'Hiccup Haddock',
    email: 'hiccup@berk.org',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    managerId: uuidv4(),
    petId: ids.PET_FLUFFY,
    name: 'Cyrano Jones',
    email: 'sales@tribbles4u.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
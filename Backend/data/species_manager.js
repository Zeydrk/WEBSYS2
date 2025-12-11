const { v4: uuidv4 } = require('uuid');
const ids = require('./ids');

module.exports = [
  {
    managerId: uuidv4(),
    accountId: ids.ACCOUNT_SPOCK,
    name: 'Spock',
    email: 's.spock@starfleet.org',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];
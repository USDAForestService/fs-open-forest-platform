'use strict';

const factory = require('unionized');

module.exports = factory.factory({
  // required integer
  forestId: 1,
  // required string
  orgStructureCode: '11-02-10',
  // required string
  treeCost: '10.00',
  // required numeric
  totalCost: 20,
  // required integer
  quantity: 2,
  // required string
  firstName: 'fName',
  // required string 
  lastName: 'lName',
  // required string
  emailAddress: 'test@email.com',
});

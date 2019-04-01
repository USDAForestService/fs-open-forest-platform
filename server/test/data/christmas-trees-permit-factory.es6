const factory = require('unionized');
const uuid = require('uuid/v4');

// Generate a random 8 digit number
const randomPermitNumber = () => Math.floor(Math.random() * 90000000) + 10000000;

module.exports = factory.factory({
  permitId: uuid,
  permitNumber: randomPermitNumber,
  orgStructureCode: '11-06-06',
  firstName: '1',
  lastName: '4',
  emailAddress: 'a@a.c',
  treeCost: '5.00',
  quantity: 1,
  totalCost: '5.00',
  status: 'Completed',
  paygovToken: 'de29d79e-aeb0-49ec-9276-b8b5c6d820e2',
  paygovTrackingId: 'C81BBB6BED',
  permitExpireDate: new Date('2019-12-24T12:00:00.000Z'),
  paygovError: null
});

const factory = require('unionized');

module.exports = factory.factory({
  // required integer
  forestId: 1,
  // required integer
  quantity: 2,
  // required string
  firstName: 'fName',
  // required string
  lastName: 'lName',
  // required string
  emailAddress: 'test@email.com'
});

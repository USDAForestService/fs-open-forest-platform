// 'use strict';

// let doTransaction = require('./modules/transaction');

// const TABLE_NAME = 'fsForests';

// module.exports = {
//   up: function(queryInterface, Sequelize) {
//     let operations = [
//       {
//         operation: 'add',
//         field: 'min_cords',
//         type: Sequelize.INTEGER
//       },
//       {
//         operation: 'add',
//         field: 'max_cords',
//         type: Sequelize.INTEGER
//       },
//     ];

//     return doTransaction(TABLE_NAME, queryInterface, operations);
//   },
//   down: function(queryInterface, Sequelize) {
//     let operations = [
//       {
//         operation: 'remove',
//         field: 'min_cords'
//       },
//       {
//         operation: 'remove',
//         field: 'max_cords'
//       }
//     ];

//     return doTransaction(TABLE_NAME, queryInterface, operations);
//   }
// };
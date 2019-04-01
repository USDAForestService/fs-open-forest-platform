const dbHelper = require('./data/db-helper.es6');

// Make sure we have a clean slate
before(async () => {
  await dbHelper.destroyAll();
});

after(async () => {
  await dbHelper.destroyAll();
});

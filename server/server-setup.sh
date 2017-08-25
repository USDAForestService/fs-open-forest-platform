#!/bin/sh

cd /app

sleep 10

/node/node_modules/sequelize-cli/bin/sequelize db:migrate

/node/node_modules/.bin/nodemon --harmony_default_parameters app.es6

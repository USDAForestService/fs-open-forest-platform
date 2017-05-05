'use strict';
let express =  require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let specialUses = require('./special-uses/special-uses.es6');

let getFunc = (req, res) => {
  res.send('FS Intake Server 2');
}

app.get('*', getFunc);

app.use('/permits/applications/special-uses', specialUses);


app.listen(8080);

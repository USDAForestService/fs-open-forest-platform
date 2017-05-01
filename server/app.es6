'use strict';
let express =  require('express');

let app = express();

app.get('*', (req, res) => res.send('FS Intake Server'));

app.listen(8080);

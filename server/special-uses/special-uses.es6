'use strict'

let express = require('express')
let router = express.Router()

// will eventually validate against json schema
// and store into db
// populates a tempControlNumber on the object before return
let createNoncommercialTempApp = (req, res) => {
  req.body['tempControlNumber'] = 1;
  res.status(200).json(req.body);
}

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
router.post('/noncommercial', createNoncommercialTempApp)

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
// retrieve an existing noncommercial application

// DELETE /permits/applications/special-uses/noncommercial/:tempControlNumber
// deletes an existing noncommercial application


module.exports = router

'use strict';

const request = require('request');

const vcapConstants = require('../vcap-constants.es6');
const christmasTreeRegulations = require('../models/forest-regulations.es6');
const species = require('../models/species.es6');
const forestSpecies = require('../models/forest-species.es6');
const speciesNotes = require('../models/species-notes.es6');

const christmasTree = {};

const translateRegulationsFromDatabaseToClient = input => {
  return {
    forest: {
      id: input.id,
      forestName: input.forestName,
      description: input.description,
      forestUrl: input.forestUrl,
      treeHeight: input.treeHeight,
      stumpHeight: input.stumpHeight,
      stumpDiameter: input.stumpDiameter,
      startDate: input.startDate,
      endDate: input.endDate,
      species: input.forestSpecies.map((species)=>{
        return {
          id: species.species.id,
          name: species.species.name,
          webUrl: species.species.webUrl,
          status: species.status,
          notes: species.species.speciesNotes.map((notes)=>{
            return notes.note;
          })
        };
      })
    }
  }; 
};


christmasTree.getOneRegulations = (req, res) => {

  christmasTreeRegulations.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: forestSpecies,
        include: [
          {
            model: species,
            include: [
              {
                model: speciesNotes
              }
            ]
          }
        ]
      }
    ]
  })
    .then(app => {
      console.log(JSON.stringify(app.dataValues, null, 4))
      if (app) {
        res.status(200).json(translateRegulationsFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

module.exports = christmasTree;

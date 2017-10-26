'use strict';

const request = require('request');

const vcapConstants = require('../vcap-constants.es6');
const christmasTreeRegulations = require('../models/forest-regulations.es6');
const species = require('../models/species.es6');
const forestSpecies = require('../models/forest-species.es6');
const speciesNotes = require('../models/species-notes.es6');
const forestLocations = require('../models/forest-locations.es6');

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
          photos: species.species.photos ? species.species.photos.toString('base64') : species.species.photos,
          status: species.status,
          notes: species.species.speciesNotes.map((notes)=>{
            return notes.note;
          })
        };
      }),
      locations: input.forestLocations.map((location)=>{
        return {
          id: location.id,
          district: location.district,
          allowed: location.allowed,
          type: location.type,
          description: location.description
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
      },
      {
        model: forestLocations
      }
    ],
    order: [
      [ forestSpecies, species, speciesNotes, 'display_order', 'ASC' ]
    ]
  })
    .then(app => {
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

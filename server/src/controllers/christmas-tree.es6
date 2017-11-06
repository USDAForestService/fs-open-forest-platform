'use strict';

const request = require('request');

const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');

const christmasTree = {};

const translateGuidelinesFromDatabaseToClient = input => {
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
      }),
      locations: input.forestLocations.map((location)=>{
        return {
          id: location.id,
          district: location.district,
          allowed: location.allowed,
          type: location.type,
          description: location.description,
          imageFilename: location.imageFilename
        };
      })
    }
  }; 
};

christmasTree.getForests = (req, res) => {
  
  treesDb.forests.findAll({
    attributes: [
      'id',
      'forestName'
    ]
  }).then(results => {
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).send();
    }
  })
  .catch(error => {
    res.status(400).json(error);
  });
};


christmasTree.getOneGuidelines = (req, res) => {

  treesDb.forests.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: treesDb.forestSpecies,
        include: [
          {
            model: treesDb.species,
            include: [
              {
                model: treesDb.speciesNotes
              }
            ]
          }
        ]
      },
      {
        model: treesDb.forestLocations
      }
    ],
    order: [
      [ treesDb.forestSpecies, treesDb.species, treesDb.speciesNotes, 'display_order', 'ASC' ],
      [ treesDb.forestLocations, 'id', 'ASC']
    ]
  })
    .then(app => {
      if (app) {
        res.status(200).json(translateGuidelinesFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

module.exports = christmasTree;

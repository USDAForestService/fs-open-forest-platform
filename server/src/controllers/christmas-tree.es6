'use strict';

const request = require('request');
const uuid = require('uuid/v4');

const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');

const christmasTree = {};

const translateGuidelinesFromDatabaseToClient = input => {
  return {
    forest: {
      id: input.id,
      forestName: input.forestName,
      description: input.description,
      forestAbbr: input.forestAbbr,
      forestUrl: input.forestUrl,
      orgStructureCode: input.orgStructureCode,
      treeHeight: input.treeHeight,
      stumpHeight: input.stumpHeight,
      stumpDiameter: input.stumpDiameter,
      startDate: input.startDate,
      endDate: input.endDate,
      forestAbbr: input.forestAbbr,
      treeCost: input.treeCost,
      maxNumTrees: input.maxNumTrees,
      species: input.christmasTreesForestSpecies.map((species)=>{
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
      locations: input.christmasTreesForestLocations.map((location)=>{
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

const translatePermitFromClientToDatabase = input => {
  return {
    permitId: uuid(),
    forestId: input.forestId,
    orgStructureCode: input.orgStructureCode,
    firstName: input.firstName,
    lastName: input.lastName,
    emailAddress: input.emailAddress,
    treeCost: input.treeCost,
    quantity: input.quantity,
    totalCost: input.totalCost 
  };
};

christmasTree.getForests = (req, res) => {

  treesDb.christmasTreesForests.findAll({
    attributes: [
      'id',
      'forestName',
      'description',
      'forestAbbr'
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

christmasTree.create = (req, res) => {
  treesDb.christmasTreesPermits.create(translatePermitFromClientToDatabase(req.body))
    .then(response => {
      req.body.permitId = response.permitId;
      req.body.status = response.status;
      return res.status(201).json(req.body);
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors });
      } else {
        return res.status(500).send();
      }
    });
};

christmasTree.getOneGuidelines = (req, res) => {

  treesDb.christmasTreesForests.findOne({
    where: {
      forestAbbr: req.params.id
    },
    include: [
      {
        model: treesDb.christmasTreesForestSpecies,
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
        model: treesDb.christmasTreesForestLocations
      }
    ],
    order: [
      [ treesDb.christmasTreesForestSpecies, treesDb.species, treesDb.speciesNotes, 'display_order', 'ASC' ],
      [ treesDb.christmasTreesForestLocations, 'description', 'ASC'],
      [ treesDb.christmasTreesForestSpecies, 'id', 'ASC']
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
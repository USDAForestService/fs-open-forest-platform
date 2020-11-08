/**
 * Module for feedback routes
 * @module routers/feedback
 */

const express = require('express');

const feedbackController = require('../controllers/feedback.es6');

const router = express.Router();

// get all feedback
router.get('/', feedbackController.getEntries);

// get feedback by id
router.get('/:id', feedbackController.getEntry);

// create new feedback entry
router.post('/create', feedbackController.createEntry);

module.exports = router;

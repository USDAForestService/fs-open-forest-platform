/**
 * Module for feedback routes
 * @module routers/feedback
 */

const express = require('express');

const feedbackController = require('../controllers/feedback.es6');

const router = express.Router();

/** get feedback entries */
router.get('/', feedbackController.getEntries);

/** get info for a single feedback entry */
router.get('/:id', feedbackController.getEntry);

// delete an entry
router.get('/:id/delete', feedbackController.deleteEntry);

/** POST a new entry */
router.post('/create', feedbackController.createEntry);

// /** Update entry */
// router.put('/feedback', middleware.checkToken, feedbackController.updateEntry);

/**
 * feedback module routes
 * @exports routers/feedback
 */
module.exports = router;

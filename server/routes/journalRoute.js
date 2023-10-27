const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Create a new journal entry
router.post('/', journalController.createJournal);

// Get a list of all journal entries for a specific user
router.get('/:userEmail', journalController.getAllJournalsForUser);

// Get a specific journal entry by ID
router.get('/:id', journalController.getJournalById);

// Update a journal entry by ID
router.put('/:id', journalController.updateJournal);

// Delete a journal entry by ID
router.delete('/:id', journalController.deleteJournal);

module.exports = router;

const Journal = require('../models/journalModel');

// Create a new journal entry
exports.createJournal = async (req, res) => {
  try {
    const { title, content, userEmail } = req.body;

    const journal = new Journal({ title, content, userEmail });

    const savedJournal = await journal.save();
    res.status(201).json(savedJournal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a list of all journal entries for a specific user
exports.getAllJournalsForUser = async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    const journals = await Journal.find({ userEmail });
    res.status(200).json(journals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific journal entry by ID
exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    res.status(200).json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a journal entry by ID
exports.updateJournal = async (req, res) => {
  try {
    const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJournal) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    res.status(200).json(updatedJournal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a journal entry by ID
exports.deleteJournal = async (req, res) => {
  try {
    const deletedJournal = await Journal.findByIdAndRemove(req.params.id);
    if (!deletedJournal) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

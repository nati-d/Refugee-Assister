// backend/controllers/audioController.js
const OpenAI = require('openai');
const multer = require('multer');
const fs = require('fs');
const apiKey = process.env.API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

// Set up multer for handling audio file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller function to transcribe audio
exports.transcribeAudio = upload.single('audio'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Audio file is missing or invalid' });
    }

    const transcription = await openai.audio.transcriptions.create({
      audio: req.file.buffer, // Access the audio data from the uploaded file
      model: 'whisper-1',
    });

    // Respond with the transcribed text
    res.status(200).json({ transcription: transcription.text });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).json({ message: 'An error occurred while transcribing audio' });
  }
};

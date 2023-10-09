const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

const audioTranscription = async (req, res) => {
    try {
        const { audioFilePath } = req.body;

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFilePath),
            model: 'whisper-1'
        });

        res.json({ transcription: transcription.text });
    } catch (error) {
        console.error('Error transcribing audio:', error);
        res.status(500).json({ error: 'An error occurred while transcribing audio' });
    }
};

module.exports = {
    audioTranscription
};

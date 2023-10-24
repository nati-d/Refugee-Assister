const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai');

const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
const openai = new OpenAI({ apiKey });

const app = express();
app.use(express.json());

app.post('/emergency', async (req, res) => {
  const userMessage = req.body.message;

  // Format user input for the OpenAI API
  const messages = [
    { role: 'system', content: 'Your system message here...' },
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    // Extract the chatbot's response
    const chatbotResponse = response.choices[0].message.content;

    res.json({ response: chatbotResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

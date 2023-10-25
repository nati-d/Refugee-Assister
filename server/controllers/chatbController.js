const axios = require('axios');
const { OpenAI } = require('openai');

const chatbotPromptTemplate = require('../prompts');
const apiKey = process.env.API_KEY; // Make sure you have the API key set in your environment

const openai = new OpenAI({
  apiKey,
});

exports.chat = async (req, res) => {
  try {
    const userInput = req.body.message;
    const userEmail = req.body.userEmail;

    const messages = [
      { role: 'system', content: chatbotPromptTemplate },
      { role: 'user', content: userInput },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 50,
      temperature: 0.7,
    });

    const chatbotResponse = response.choices[0].message.content;

    const timestamp = new Date();

    const userMessage = { role: 'user', content: userInput, timestamp };
    const assistantMessage = { role: 'assistant', content: chatbotResponse, timestamp };

  
    User.findOneAndUpdate(
      { email: userEmail },
      {
        $push: {
          chatHistory: [userMessage, assistantMessage],
        },
      },
      { new: true }
    )
      .then((user) => {
        if (user) {
          res.json({ response: chatbotResponse });
        } else {
          // User not found
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((error) => {
        console.error('Error updating chat history:', error);
        res.status(500).json({ error: 'An error occurred' });
      });
  } catch (error) {
    console.error('Error:', error.message);
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: 'Invalid JSON in the request body' });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
};

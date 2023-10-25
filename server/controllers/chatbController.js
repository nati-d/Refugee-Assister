const User = require('../models/userModel');
const { OpenAI } = require("openai");
const mentalHealthKeywords = require('../constants');
const chatbotPromptTemplate = require('../prompts')

const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey,
});

let conversationState = [];

function formatUserInput(userInput) {
  const messages = [
    { role: "system", content: chatbotPromptTemplate },
    ...conversationState, 
    { role: "user", content: userInput },
  ];

  return messages;
}

// Rule-based intent detection
function detectIntent(userInput) {
  const normalizedInput = userInput.toLowerCase();
  const normalizedKeywords = mentalHealthKeywords.map(keyword => keyword.toLowerCase());

  if (normalizedKeywords.some(keyword => normalizedInput.includes(keyword))) {
    return "Mental Health";
  }

  return "Other Topics";
}


exports.chat = async (req, res) => {
  try {
    const userInput = req.body.message;
    const userEmail = req.body.userEmail;
    const intent = detectIntent(userInput);

    if (intent === 'Mental Health') {
      const messages = formatUserInput(userInput);
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 50,
        temperature: 0.7,
      });
      const chatbotResponse = response.choices[0].message.content;
      conversationState = [...messages, { role: 'assistant', content: chatbotResponse }];

      // Add timestamp to each message
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
    } else {
      // Handle other topics
      const otherTopicsResponse = "I'm here to provide mental health support. If you have mental health-related questions, feel free to ask.";
      res.json({ response: otherTopicsResponse });
    }
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
}

const { OpenAI } = require("openai");
const chatbotPromptTemplate = require('../prompts')

const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey,
});

let conversationState = [];

function formatUserInput(userInput) {
  const messages = [
    { role: "system", content: chatbotPromptTemplate },
    ...conversationState,
    { role: "user", content: userInput },
  ];

  return messages;
}

exports.chat = async (req, res) => {
  try {
    const userInput = req.body.message;
    const userEmail = req.body.userEmail;

    const messages = formatUserInput(userInput);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 50,
      temperature: 0.7,
    });
    const chatbotResponse = response.choices[0].message.content;
    conversationState = [...messages, { role: 'assistant', content: chatbotResponse }];

    // Add timestamp to each message
    const timestamp = new Date();
    const userMessage = { role: 'user', content: userInput, timestamp };
    const assistantMessage = { role: 'assistant', content: chatbotResponse, timestamp };

    // You can add the code to store chat history in your database here if needed

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

    res.json({ response: chatbotResponse });
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
}


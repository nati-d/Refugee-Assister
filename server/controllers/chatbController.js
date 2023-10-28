// Import necessary modules and dependencies
const User = require('../models/userModel'); // Import the User model
const { OpenAI } = require("openai"); // Import the OpenAI library
const prompts = require("../prompts"); // Import prompts module

// Retrieve the OpenAI API key from environment variables
const apiKey = process.env.API_KEY;

// Create an instance of the OpenAI class with the API key
const openai = new OpenAI({
  apiKey: apiKey,
});

// Initialize an empty array to store the conversation state
let conversationState = [];

/**
 * Function to format user input and conversation messages
 * @param {string} userInput - The user's input message
 * @returns {Array} - An array of message objects with roles and content
 */
function formatUserInput(userInput) {
  // Construct an array of messages, including a system message, conversation history, and user input
  const messages = [
    { role: "system", content: prompts.chatbotPromptTemplate },
    ...conversationState,
    { role: "user", content: userInput },
  ];

  return messages;
}

/**
 * Express route handler for handling chat requests
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.chat = async (req, res) => {
  try {
    // Extract user input and user email from the request body
    const userInput = req.body.message;
    const userEmail = req.body.userEmail;

    // Format user input and conversation history into a message array
    const messages = formatUserInput(userInput);

    // Make a request to OpenAI's chat completions endpoint
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Specify the GPT-3.5-turbo model
      messages, // Include formatted messages
      temperature: 0.7, // Set the temperature for response randomness
    });

    // Extract the chatbot's response from the OpenAI response
    const chatbotResponse = response.choices[0].message.content;

    // Update the conversation state with the new messages
    conversationState = [...messages, { role: 'assistant', content: chatbotResponse }];

    // Add a timestamp to both user and assistant messages
    const timestamp = new Date();
    const userMessage = { role: 'user', content: userInput, timestamp };
    const assistantMessage = { role: 'assistant', content: chatbotResponse, timestamp };

    // Update the chat history of the user in the database
    User.findOneAndUpdate(
      { email: userEmail }, // Find the user by email
      {
        $push: {
          chatHistory: [userMessage, assistantMessage], // Push the user and assistant messages to the chatHistory array
        },
      },
      { new: true } // Return the updated user object
    )
      .then((user) => {
        if (user) {
          // Respond with the chatbot's response
          res.json({ response: chatbotResponse });
        } else {
          // User not found
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((error) => {
        console.error('Error during OpenAI API call:', error);
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

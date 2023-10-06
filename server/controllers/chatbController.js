const { OpenAI } = require("openai");
const axios = require('axios');

const apiKey = process.env.API_KEY;

let conversationState = [];

// Format user input for the OpenAI API
function formatUserInput(userInput) {
  const messages = [
    // ... (system message),
    ...conversationState, // Include previous messages in the conversation
    { role: "user", content: userInput },
  ];

  return messages;
}

exports.chat = async (req, res) => {
  try {
    const userInput = req.body.message;
    const messages = formatUserInput(userInput);

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    // Extract the chatbot's response
    const chatbotResponse = response.data.choices[0].message.content;

    // Save the current conversation state for future reference
    conversationState = [...messages, { role: "assistant", content: chatbotResponse }];

    // Return the chatbot response as the API response
    res.json({ response: chatbotResponse });
  } catch (error) {
    console.error("Error:", error.message);
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON in request body" });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

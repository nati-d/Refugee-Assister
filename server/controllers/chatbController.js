const { OpenAI } = require("openai");

const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey,
});

// Create a conversation state variable to store previous messages
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
    const userInput = req.body.message; // Changed from userInput to message
    if (!userInput) {
      throw new Error("User input is missing");
    }
    const messages = formatUserInput(userInput);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Extract the chatbot's response
    const chatbotResponse = response.choices[0].message.content;

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

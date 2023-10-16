const { OpenAI } = require("openai");
const mentalHealthKeywords = require('../constants');

const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey,
});

// Create a conversation state variable to store previous messages
let conversationState = [];

// Format user input for the OpenAI API
function formatUserInput(userInput) {
  const messages = [
    { role: "system", content: "Your system message here..." },
    ...conversationState, // Include previous messages in the conversation
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
    const intent = detectIntent(userInput);

    if (intent === "Mental Health") {
      const messages = formatUserInput(userInput);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
      });
      const chatbotResponse = response.choices[0].message.content;
      conversationState = [...messages, { role: "assistant", content: chatbotResponse }];
      res.json({ response: chatbotResponse });
    } else {
      // Handle other topics
      const otherTopicsResponse = "I'm here to provide mental health support. If you have mental health-related questions, feel free to ask.";
      res.json({ response: otherTopicsResponse });
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON in the request body" });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

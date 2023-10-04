const { OpenAI } = require("openai");

const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey,
});

// Format user input for the OpenAI API
function formatUserInput(userInput) {
  const messages = [
    {
      role: "system",
      content: "You are a helpful mental health assistant.",
    },
    {
      role: "user",
      content: userInput,
    },
  ];

  return messages;
}

exports.chat = async (req, res) => {
  try {
// It take the user input from the body
    const userInput = req.body.userInput;
    const messages = formatUserInput(userInput);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Extract the chatbot's response
    const chatbotResponse = response.choices[0].message.content;

    // Return the chatbot response as the API response
    res.json({ response: chatbotResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};
// Import the OpenAI library and set the API key
const apiKey = process.env.API_KEY; // Make sure to replace this with your actual API key
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey });

/**
 * Controller function to get information about a specific hospital
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.getHospitalInfo = async (req, res) => {
  try {
    // Extract the hospital name from the URL parameter
    const hospitalName = req.params.message;

    // Create a user message to request information about the specific hospital
    const messages = [
      {
        role: "system",
        content: "You are an AI-powered chatbot specifically designed to provide mental health support and therapy-like services to refugees...",
      },
      { role: "user", content: message }, // It should be 'hospitalName' instead of 'message'
    ];

    // Make a request to the OpenAI GPT-3.5-turbo model
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Extract the chatbot's response from the OpenAI response
    const chatbotResponse = response.choices[0].message.content;

    // Respond with the chatbot's response
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

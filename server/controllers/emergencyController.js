const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Function to generate a response for emergency contacts
async function generateEmergencyContactsResponse(country) {
  try {
    const prompt = `Give me all the necessary emergency contacts in ${country} as a list and do not include any other sentences as a response outside of the list `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI-powered emergency contact provider. The user will specify a country, and you will provide a list of emergency contacts for that country.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating emergency contacts response:", error);
    throw error;
  }
}

// Controller function to get emergency contacts for a specific country
exports.getEmergencyContacts = async (req, res) => {
  try {
    const { country } = req.body.message; // Assuming the frontend sends the country name

    // Generate a chat response for emergency contacts in the specified country
    const response = await generateEmergencyContactsResponse(country);

    res.json({ response });
  } catch (error) {
    console.error("Error generating emergency contacts response:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

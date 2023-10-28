// Import necessary modules and dependencies
const { OpenAI } = require("openai"); // Import the OpenAI library
const prompts = require("../prompts"); // Import prompts module

// Create an instance of the OpenAI class with the API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Retrieve the OpenAI API key from environment variables
});

/**
 * Asynchronous function to generate a list of emergency contacts based on a given message
 * @param {string} emergencyMsg - The message that describes the emergency
 * @returns {Array} - An array of emergency contact objects with names and phone numbers
 */
async function generateEmergencyContact(emergencyMsg) {
  try {
    // Construct a prompt for generating emergency contacts
    const prompt = `list 10 emergency contacts in ${emergencyMsg} `;

    // Create a chat completion request to the OpenAI model
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompts.emergencyContactPromptTemplate,
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    // Check for an empty or missing response
    if (!completion.choices || completion.choices.length === 0) {
      console.error("Empty response from OpenAI model");
      return [];
    }

    // Extract the emergency contact list from the OpenAI response
    const emergencyList = completion.choices[0].message.content;

    // Check if the emergency list is empty
    if (!emergencyList) {
      console.error("No emergency contact information in the response");
      return [];
    }

    // Parse and extract emergency contact information
    const emergencies = parseEmergencyList(emergencyList);

    return emergencies;
  } catch (error) {
    console.error("Error generating emergency contact:", error);
    throw error;
  }
}

/**
 * Function to parse the emergency contact list and extract contact details
 * @param {string} emergencyList - The list of emergency contacts as a string
 * @returns {Array} - An array of emergency contact objects with names and phone numbers
 */
function parseEmergencyList(emergencyList) {
  if (!emergencyList) {
    return []; // Return an empty array if emergencyList is undefined or empty
  }

  const emergencies = [];

  // Split the emergencyList string into lines
  const lines = emergencyList.trim().split("\n");

  for (const line of lines) {
    // Split each line into parts using commas
    const parts = line.split(",");

    // Ensure that there are at least two parts before extracting data
    if (parts.length >= 2) {
      // Extract the emergency name and phone number
      const name = parts[0].split("=")[1].trim();
      const phoneNo = parts[1].split("=")[1].trim();

      // Create a new emergency object and add it to the emergencies array
      const emergency = {
        name,
        phoneNo,
      };

      emergencies.push(emergency);
    }
  }

  return emergencies;
}

/**
 * Express route handler for getting emergency contacts based on a message
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.getEmergencyContacts = async (req, res) => {
  try {
    // Extract the emergency message from the request body
    const emergencyMsg = req.body.message;

    // Generate a list of emergency contacts based on the message
    const emergencies = await generateEmergencyContact(emergencyMsg);

    // Respond with the list of emergency contacts
    res.json({ emergencies });
    console.log(emergencies);
  } catch (error) {
    console.error("Error generating hospital data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

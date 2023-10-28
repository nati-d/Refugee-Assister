// Import necessary modules and dependencies
const { OpenAI } = require("openai"); // Import the OpenAI library
const prompts = require("../prompts"); // Import prompts module

// Create an instance of the OpenAI class with the API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Retrieve the OpenAI API key from environment variables
});

/**
 * Asynchronous function to generate a list of hospitals in a city with their latitude and longitude
 * @param {string} hospitalMsg - The name of the city for which to generate hospital information
 * @returns {Array} - An array of hospital objects with names, latitude, and longitude
 */
async function generateHospitalsInCity(hospitalMsg) {
  try {
    // Construct a prompt for generating hospital information in the specified city
    const prompt = `list 10 Hospitals in ${hospitalMsg} with their latitude and longitude `;

    // Create a chat completion request to the OpenAI model
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompts.hospitalListPromptTemplate,
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    // Extract the hospital list from the OpenAI response
    const hospitalList = completion.choices[0].message.content;

    // Check if the hospital list is empty or undefined
    if (!hospitalList || hospitalList.trim() === "") {
      return []; // Return an empty array if the list is undefined or empty
    }

    // Parse and extract hospital details
    const hospitals = parseHospitalList(hospitalList);

    return hospitals;
  } catch (error) {
    console.error("Error generating hospital data:", error);
    throw error;
  }
}

/**
 * Function to parse the hospital list and extract hospital details
 * @param {string} hospitalList - The list of hospitals as a string
 * @returns {Array} - An array of hospital objects with names, latitude, and longitude
 */
function parseHospitalList(hospitalList) {
  const hospitals = [];

  // Split the hospitalList string into lines
  const lines = hospitalList.trim().split("\n");

  for (const line of lines) {
    // Split each line by commas
    const parts = line.split(",");

    // Extract the hospital name, latitude, and longitude from the parts array
    const name = parts[0].split("=")[1].trim();
    const latitude = parts[1].split("=")[1].trim();
    const longitude = parts[2].split("=")[1].trim();

    // Create a new hospital object and add it to the hospitals array
    const hospital = {
      name,
      latitude,
      longitude,
    };

    hospitals.push(hospital);
  }

  return hospitals;
}

/**
 * Express route handler for generating a list of hospitals in a city
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.generateHospitals = async (req, res) => {
  try {
    // Extract the city name from the request body
    const hospitalMsg = req.body.city;

    // Generate a list of hospitals in the specified city
    const hospitals = await generateHospitalsInCity(hospitalMsg);

    // Respond with the list of hospitals
    res.json({ hospitals });
  } catch (error) {
    console.error("Error generating hospital data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

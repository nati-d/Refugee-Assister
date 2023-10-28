// Import necessary modules and dependencies
const { OpenAI } = require("openai"); // Import the OpenAI library
const symptomCheckerPromptTemplate = require("../prompts").symptomCheckerPromptTemplate; // Import your prompt module
// Create an instance of the OpenAI class with the API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // Retrieve the OpenAI API key from environment variables
});

//initialize a cache to store previously generated responses to prevent redundant request to OpenAI model
const cache = {};

/**
 * Generate a chat response based on a user's symptom and language.
 *
 * @param {string} userSymptom - The user's symptom input.
 * @param {string} userLanguage - The user's language.
 * @returns {Promise<object>} - An object containing disease information.
 * @throws {Error} - Throws an error if an issue occurs during response generation.
 */
async function generateChatResponse(userSymptom, userLanguage) {
  //check the user's symptom input found in the cache
  if (cache[userSymptom]) {
    return cache[userSymptom]; //return the cache with the user's symptom input
  }
  try {
    // Replace the placeholder with the user's language in the prompt
    const promptWithLanguage = symptomCheckerPromptTemplate.replace("{{userLanguage}}", userLanguage.toUpperCase());
    // Make a request to OpenAI's chat completions endpoint
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: promptWithLanguage},
        { role: "user", content: userSymptom },
      ],
      model: "gpt-3.5-turbo", // Specify the GPT-3.5-turbo model
    });
    // Extract the diagnosis's response from the OpenAI response
    const responseContent = completion.choices[0].message.content;
    
    console.log(promptWithLanguage)
    // Extract disease name, details, treatment, and recommendation from the response
    const jsonResponse = JSON.parse(responseContent);
    const { "Disease name": diseaseName, Details: details, Treatment: treatment, Recommendation: recommendation } = jsonResponse;

    // Store the response in the cache for future use
    cache[userSymptom] = {
      diseaseName,
      details,
      treatment,
      recommendation
    };
    //return the cache of the user's symptom
    return cache[userSymptom];

  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}
/**
 * Controller function for checking symptoms.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.checkSymptom = async (req, res) => {
  try {
    // Extract user input and user's preferred language from the request body
    const userSymptom = req.body.message;
    const userLanguage = req.body.language;

    const {diseaseName,details,treatment,recommendation} = await generateChatResponse(userSymptom, userLanguage);
// Respond with the diagnosis's result response
    res.json({ diseaseName,details,treatment,recommendation});

  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

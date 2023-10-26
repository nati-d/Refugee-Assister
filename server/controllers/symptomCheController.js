const { OpenAI } = require("openai");
const symptomCheckerPromptTemplate = require("../prompts").symptomCheckerPromptTemplate; // Import your prompt module
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const cache = {};

async function generateChatResponse(userSymptom) {
  if (cache[userSymptom]) {
    return cache[userSymptom];
  }
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: symptomCheckerPromptTemplate },
        { role: "user", content: userSymptom },
      ],
      model: "gpt-3.5-turbo",
    });

    const responseContent = completion.choices[0].message.content;
    // Extract disease name, details, treatment, and recommendation from the response
    const jsonResponse = JSON.parse(responseContent);
    const { "Disease name": diseaseName, Details: details, Treatment: treatment, Recommendation: recommendation } = jsonResponse;

    // Cache the response
    cache[userSymptom] = {
      diseaseName,
      details,
      treatment,
      recommendation
    };

    return cache[userSymptom];

  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}

exports.checkSymptom = async (req, res) => {
  try {
    const userSymptom = req.body.message;

    const {diseaseName,details,treatment,recommendation} = await generateChatResponse(userSymptom);

    res.json({ diseaseName,details,treatment,recommendation});

  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

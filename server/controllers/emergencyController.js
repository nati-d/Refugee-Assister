const { OpenAI } = require("openai");
const prompts = require("../prompts")

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function generateEmergencyContact(emergencyMsg) {
  try {
    const prompt = `list 10 emergency contact in ${emergencyMsg} `;

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

    if (!completion.choices || completion.choices.length === 0) {
      // Handle the case where the response is empty
      console.error("Empty response from OpenAI model");
      return [];
    }

    const emergencyList = completion.choices[0].message.content;
    console.log(emergencyList);

    if (!emergencyList) {
      // Handle the case where emergencyList is empty
      console.error("No emergency contact information in the response");
      return [];
    }

    const emergencies = parseEmergencyList(emergencyList);

    return emergencies;
  } catch (error) {
    console.error("Error generating emergency contact:", error);
    throw error;
  }
}

function parseEmergencyList(emergencyList) {
  if (!emergencyList) {
    // Handle the case where emergencyList is undefined or empty
    return [];
  }

  const emergencies = [];

  // Split the emergencyList string by line breaks
  const lines = emergencyList.trim().split("\n");

  for (const line of lines) {
    // Split each line by commas
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

exports.getEmergencyContacts = async (req, res) => {
  try {
    const emergencyMsg = req.body.city;

    const emergencies = await generateEmergencyContact(emergencyMsg);

    res.json({ emergencies });
  } catch (error) {
    console.error("Error generating hospital data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

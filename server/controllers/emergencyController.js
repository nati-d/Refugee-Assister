const { OpenAI } = require("openai");
const prompts = require("../prompts")

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function generateEmergencyContact(city) {
  try {
    const prompt = `list 10 emergency contact in ${city} with their name and phone number `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",content:prompts.emergencyContactPromptTemplate   },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    const emergencyList = completion.choices[0].message.content;
    console.log(emergencyList)


   
    const emergencies = parseEmergencyList(emergencyList);

    return emergencies;
  } catch (error) {
    console.error("Error generating emergency contact:", error);
    throw error;
  }
}

function parseEmergencyList(emergencyList) {
      // Extract hospital details from the response
  if(!emergencyList || emergencyList.trim() === ""){
    // Return an empty array if emergencyList is undefined or empty
       return [];}
  const emergencies = [];

  // Split the emergencyList string by line breaks
  const lines = emergencyList.trim().split("\n");

  for (const line of lines) {
    // Split each line by commas
    const parts = line.split(",");

    // Extract the hospital name, latitude, and longitude from the parts array
    const name = parts[0].split("=")[1].trim();
    const phoneNo = parts[1].split("=")[1].trim();

    // Create a new hospital object and add it to the hospitals array
    const emergency = {
      name,
      phoneNo,
    };

    emergencies.push(emergency);
  }

  return emergencies;
}
exports.getEmergencyContacts = async (req, res) => {
  try {
    const city = req.body.city;

    const emergencies = await generateEmergencyContact(city);

    res.json({ emergencies });
  } catch (error) {
    console.error("Error generating hospital data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

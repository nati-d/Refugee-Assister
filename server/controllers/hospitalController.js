const { OpenAI } = require("openai");
const prompts = require("../prompts")

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function generateHospitalsInCity(hospitalMsg) {
  try {
    const prompt = `list 10 Hospitals in ${hospitalMsg} with their latitude and longtiude `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",content:prompts.hospitalListPromptTemplate   },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    const hospitalList = completion.choices[0].message.content;

    // Extract hospital details from the response
    if(!hospitalList || hospitalList.trim() === ""){
      // Return an empty array if hospitalList is undefined or empty
     return [];
   }
    const hospitals = parseHospitalList(hospitalList);

    return hospitals;
  } catch (error) {
    console.error("Error generating hospital data:", error);
    throw error;
  }
}

function parseHospitalList(hospitalList) {
  const hospitals = [];

  // Split the hospitalList string by line breaks
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
      longitude
    };

    hospitals.push(hospital);
  }

  return hospitals;
}
exports.generateHospitals = async (req, res) => {
  try {
    const hospitalMsg = req.body.city;

    const hospitals = await generateHospitalsInCity(hospitalMsg);

    res.json({ hospitals });
  } catch (error) {
    console.error("Error generating hospital data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

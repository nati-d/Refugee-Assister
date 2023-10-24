const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Function to extract numeric values from a string
function extractNumericValues(str) {
  const regex = /-?\d+(\.\d+)?/g;
  const matches = str.match(regex);
  return matches ? matches.map(parseFloat) : [];
}
// Function to extract hospital name from response
function extractHospitalNameFromResponse(response) {
  const regex = /H-name: \s*(.*)/i;
  const match = response.match(regex);
  return match ? match[1] : null;
}

// Function to generate a response from the ChatGPT API
async function generateChatResponse(userSymptom) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI-powered symptom checker for refugees. The user will provide a list of symptoms they are experiencing, and you will analyze the symptoms to identify potential diseases and recommend appropriate treatments. Your goal is to act as a virtual doctor, providing accurate diagnoses and treatment recommendations. If the user symptoms are beyond your knowledge, you should recommend them to check our nearby hospital provider map system on our application for further assistance. Remember to prioritize the well-being of the users and provide informative and empathetic responses. Your Response Format should include: Disease name : , details about the disease and its symptoms, Treatment: (always start with the word Treatment:), and precise location Recommendations: Provide accurate and complete location information including hospital name (always start with the word H-name : ) , longitude= (always start with the word longitude: ) and latitude = (always start with the word latitude: ) coordinates for the nearest suitable healthcare facility. Ensure that the latitude and longitude information is correct and not intechanged please avoid interchanging values of latitude and longtiude mostly always the smaller value is latitude, like the accuracy provided by Google Maps. and Don't say I am not a doctor just start with based on the symptom x"
        },    
        { role: "user", content: userSymptom },
      ],
      model: "gpt-3.5-turbo",
    });

    const responseContent = completion.choices[0].message.content;
    const responseParts = responseContent.split(/(Longitude|Latitude):\s+/i);



    // Extract the longitude and latitude
    let longitude;
    let latitude;
    let hospitalName;

    if (responseParts.length >= 3) {
      longitude = extractNumericValues(responseParts[2])[0];
      latitude = extractNumericValues(responseParts[4])[0];
      hospitalName = extractHospitalNameFromResponse(responseContent);
    }

    console.log(latitude," ", longitude, " ", hospitalName)
    return {
      response: responseContent,
      longitude,
      latitude,
      hospitalName
    };

  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}

// Controller function for symptom checker
exports.checkSymptom = async (req, res) => {
  try {
    const userSymptom = req.body.message;

    // Generate a chat response based on the user's symptom
    const { response, longitude, latitude , hospitalName } = await generateChatResponse(userSymptom);

    res.json({ response, longitude, latitude , hospitalName });

  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
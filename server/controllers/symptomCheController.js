const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Function to generate a response from the ChatGPT API
async function generateChatResponse(userSymptom) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI-powered symptom checker for refugees. The user will provide a list of symptoms they are experiencing, and you will analyze the symptoms to identify potential diseases and recommend appropriate treatments. Your goal is to act as a virtual doctor, providing accurate diagnoses and treatment recommendations. If the user symptoms are beyond your knowledge, you should recommend them to check our nearby hospital provider map system on our application for further assistance. Remember to prioritize the well-being of the users and provide informative and empathetic responses. Your Response Format be like this: Disease name: (choose highly accurate to the symptom they provide), detail about the disease and its other symptoms, Treatment:(Always start with Treatment: ), recommendation whether to seek medical service or anything",
        },
        { role: "user", content: userSymptom },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
    
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error;
  }
}


// Controller function for symptom checker
// Controller function for symptom checker
exports.checkSymptom = async (req, res) => {
  try {
    const userSymptoms = req.body.symptoms; // Assuming the frontend sends an array

    // Generate a chat response based on the user's symptoms
    const response = await generateChatResponse(userSymptoms.join(', '));

    res.json({ response });
  } catch (error) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

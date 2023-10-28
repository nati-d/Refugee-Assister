const { OpenAI } = require("openai");
const prompts = require("../prompts")

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function generateFunFact(funFactMsg) {
  try {
    const prompt = `Give me an interesting fun fact about the ${funFactMsg} `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompts.funFactPromptTemplate,
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

    const aFunFact = completion.choices[0].message.content;
    console.log(aFunFact);

    if (!aFunFact) {
      // Handle the case where emergencyList is empty
      console.error("No fun fact in the response");
      return [];
    }

    return aFunFact;
  } catch (error) {
    console.error("Error generating funFact:", error);
    throw error;
  }
}

exports.getFunFact = async (req, res) => {
  try {
    const funFactMsg = req.body.message;

    const funFact = await generateFunFact(funFactMsg);

    res.json({ funFact });
    console.log(funFact);
  } catch (error) {
    console.error("Error generating fun fact:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

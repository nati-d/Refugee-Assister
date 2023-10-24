const { checkSymptom } = require('../controllers/symptomCheController');
const { OpenAI } = require("openai"); // Import OpenAI class

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Based on the symptom....'
              }
            }
          ]
        })
      }
    }
  }))
}));

describe('checkSymptom', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        message: 'Fatigue,cough,headache'
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a chat response and send it as JSON", async () => {
    await checkSymptom(req, res);

    expect(res.json).toBeCalledWith({
      response: "Based on the symptom...."
    });
  });

  
});
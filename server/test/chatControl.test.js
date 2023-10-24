const { chat } = require('../controllers/chatbController');
const openai  = require("openai")

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Chatbot response'
              }
            }
          ]
        })
      }
    }
  }))
}));


describe('chat', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        message: 'How can I improve my mental health?'
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

  test('should handle mental health-related topic', async () => {
    await chat(req, res);

    expect(res.json).toBeCalledWith({
      response: 'Chatbot response'
    });
  });

  test('should handle other topics', async () => {
    req.body.message = 'What is the weather like today?';

    await chat(req, res);

    expect(res.json).toBeCalledWith({
      response: 'I\'m here to provide mental health support. If you have mental health-related questions, feel free to ask.'
    });
  });

  test('should handle error: invalid JSON in request body', async () => {
    req = {
      body: 'invalid'
    };

    await chat(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: 'Invalid JSON in the request body'
    });
  });

  
});
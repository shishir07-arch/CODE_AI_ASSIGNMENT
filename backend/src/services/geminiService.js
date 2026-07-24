const { getGeminiModel } = require('../config/gemini');

const askGemini = async (question) => {
  try {
    const model = getGeminiModel();

    const result = await model.generateContent(
      `You are a coding tutor. Answer clearly and concisely.\n\nQuestion: ${question}`
    );

    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(error.message || 'Failed to generate response from Gemini');
  }
};

module.exports = {
  askGemini
};

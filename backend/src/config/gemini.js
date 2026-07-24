const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAIClient = null;
let geminiModel = null;

const getGeminiModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  if (!genAIClient) {
    genAIClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  if (!geminiModel) {
    geminiModel = genAIClient.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash'
    });
  }

  return geminiModel;
};

module.exports = {
  getGeminiModel
};

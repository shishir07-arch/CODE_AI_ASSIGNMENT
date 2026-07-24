const { askGemini } = require('../services/geminiService');
const { sendSuccess, sendError } = require('../utils/response');

const askTutor = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return sendError(res, 'Question is required', ['Question is required'], 400);
    }

    const answer = await askGemini(question.trim());

    return sendSuccess(res, 'Tutor response generated', { answer }, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  askTutor
};

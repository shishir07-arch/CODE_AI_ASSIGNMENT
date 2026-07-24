const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/response');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'No token provided', [], 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findUserById(decoded.id);

    if (!user) {
      return sendError(res, 'User not found', [], 401);
    }

    delete user.password;

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', [], 401);
  }
};

module.exports = protect;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', errors.array().map((err) => err.msg), 400);
    }

    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.getUserByEmail(normalizedEmail);
    if (existingUser) {
      return sendError(res, 'User already exists', [], 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser({ name, email: normalizedEmail, password: hashedPassword });

    const token = generateToken(user);

    return sendSuccess(res, 'User registered successfully', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    }, 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', errors.array().map((err) => err.msg), 400);
    }

    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.getUserByEmail(normalizedEmail);
    if (!user) {
      return sendError(res, 'Invalid credentials', [], 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', [], 401);
    }

    const token = generateToken(user);

    return sendSuccess(res, 'Login successful', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    }, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};

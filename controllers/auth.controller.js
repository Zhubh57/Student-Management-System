const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = require('../config');
const AppError = require('../utils/AppError');
const sendResponse = require('../utils/responseHandler');

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '7d'
  });
};

/**
 * Signup Controller
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError('User already exists with this email', 400));
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const token = generateToken(user._id);

    // Don't send password back
    user.password = undefined;

    sendResponse(res, 201, 'success', { user, token }, 'User registered successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Login Controller
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check for user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = generateToken(user._id);

    // Don't send password back
    user.password = undefined;

    sendResponse(res, 200, 'success', { user, token }, 'User logged in successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };

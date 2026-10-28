const { body, validationResult } = require('express-validator');

// Validation error collector helper
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// Contact form validation rules
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be at least 10 characters long'),
  validateResults,
];

// Admin login validation rules
const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username or email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateResults,
];

// Project creation validation rules
const validateProject = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Short description is required'),
  body('category')
    .optional()
    .isIn(['Full Stack', 'Frontend', 'Backend', 'Mobile / Android', 'Systems & Core', 'Other'])
    .withMessage('Invalid project category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),
  body('liveUrl')
    .optional()
    .trim(),
  body('githubUrl')
    .optional()
    .trim(),
  validateResults,
];

// Project update validation rules (fields optional)
const validateUpdateProject = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Project title cannot be empty'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Short description cannot be empty'),
  body('category')
    .optional()
    .isIn(['Full Stack', 'Frontend', 'Backend', 'Mobile / Android', 'Systems & Core', 'Other'])
    .withMessage('Invalid project category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),
  body('liveUrl')
    .optional()
    .trim(),
  body('githubUrl')
    .optional()
    .trim(),
  validateResults,
];

module.exports = {
  validateContact,
  validateLogin,
  validateProject,
  validateUpdateProject,
};


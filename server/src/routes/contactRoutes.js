const express = require('express');
const router = express.Router();
const { submitContactForm, getContactMessages } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');
const { validateContact } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(contactLimiter, validateContact, submitContactForm)
  .get(protect, getContactMessages);

module.exports = router;


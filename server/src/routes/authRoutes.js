const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateLogin } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authLimiter, validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;


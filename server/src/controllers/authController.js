const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { getDBStatus } = require('../config/db');

// Sign JWT helper
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_jwt_key_change_in_production_123456', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public (Rate-limited)
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const dbStatus = getDBStatus();

    // Check database if connected
    if (dbStatus.connected) {
      const admin = await Admin.findOne({
        $or: [{ username }, { email: username.toLowerCase() }],
      }).select('+password');

      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password.',
        });
      }

      const token = generateToken({
        id: admin._id,
        username: admin.username,
        role: admin.role,
      });

      return res.status(200).json({
        success: true,
        message: 'Authentication successful',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    // Fallback mode using environment credentials
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
    const defaultEmail = process.env.ADMIN_EMAIL || 'pandyaherry51@gmail.com';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePassword123!';

    if ((username === defaultUsername || username === defaultEmail) && password === defaultPassword) {
      const token = generateToken({
        id: 'mock-admin-id',
        username: defaultUsername,
        role: 'admin',
      });

      return res.status(200).json({
        success: true,
        message: 'Authentication successful (development mode)',
        token,
        admin: {
          id: 'mock-admin-id',
          username: defaultUsername,
          email: defaultEmail,
          role: 'admin',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Protected
const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
};


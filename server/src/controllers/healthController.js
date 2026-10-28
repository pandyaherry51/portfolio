const { getDBStatus } = require('../config/db');

// @desc    Health check endpoint
// @route   GET /api/health
// @access  Public
const getHealthStatus = (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbStatus.connected,
      readyState: dbStatus.readyState,
      name: dbStatus.name,
    },
    version: '1.0.0',
  });
};

module.exports = {
  getHealthStatus,
};


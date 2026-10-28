require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const { initMailer } = require('./config/mailer');

const PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
  // 1. Initialize MongoDB connection
  await connectDB();

  // 2. Initialize Nodemailer
  await initMailer();

  // 3. Start Express server
  const server = app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Portfolio API Server running on port: ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 Projects Endpoint: http://localhost:${PORT}/api/projects`);
    console.log(`==================================================\n`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n🛑 Gracefully shutting down server...');
    server.close(() => {
      console.log('⚡ HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();


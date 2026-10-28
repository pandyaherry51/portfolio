require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const defaultProjects = require('./defaultProjects');

const seedData = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in your environment variables.');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB for database seeding...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB.');

    // 1. Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail = process.env.ADMIN_EMAIL || 'pandyaherry51@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePassword123!';

    await Admin.deleteMany({ username: adminUsername });
    const admin = new Admin({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
    });
    await admin.save();
    console.log(`👤 Admin user seeded: ${adminUsername} (${adminEmail})`);

    // 2. Seed Projects
    await Project.deleteMany({});
    const cleanedProjects = defaultProjects.map(({ _id, ...rest }) => rest);
    const insertedProjects = await Project.insertMany(cleanedProjects);
    console.log(`🚀 Seeded ${insertedProjects.length} portfolio projects successfully!`);

    console.log('\n✨ Database seeding complete. You can now start the server with "npm run dev".\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();


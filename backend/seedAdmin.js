// One-time script to create the admin account.
// Run with: node seedAdmin.js
// Reads ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD from .env

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (existing) {
      console.log('Admin user already exists. Aborting seed.');
      process.exit(0);
    }

    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    console.log(`Admin user created successfully: ${admin.username} (${admin.email})`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();

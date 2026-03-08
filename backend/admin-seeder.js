/**
 * Kings Bakes – Admin User Seeder
 * Creates the default admin account in MongoDB.
 * Run: node backend/admin-seeder.js
 *
 * Default credentials:
 *   Username: admin
 *   Password: kingsbakes123
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kingsbakes');
    console.log('MongoDB Connected');

    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin user already exists. Skipping creation.');
      await mongoose.disconnect();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('kingsbakes123', salt);

    await Admin.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    console.log('  Username: admin');
    console.log('  Password: kingsbakes123');
    console.log('  --> Change this password after first login!');

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Admin seeder error:', err.message);
    process.exit(1);
  }
};

seedAdmin();

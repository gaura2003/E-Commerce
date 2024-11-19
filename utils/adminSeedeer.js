import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/userModels.js'; // Adjust the path as needed

// Create admin user
const createAdmin = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('securepassword123', 10);

    // Create a new admin user
    const admin = new User({
      fullname: 'Admin',
      email: 'admin@example.com',
      phone: '1234567890',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
};

// Run the function
createAdmin();

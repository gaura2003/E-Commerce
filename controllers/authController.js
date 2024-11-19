import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';


// Register a new user
export const registerUser = async (req, res) => {
  const { fullname, email, phone, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if the user already exists by email or phone
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    return res.status(400).json({ message: 'User with this email or phone already exists' });
  }

  // Hash the password before saving to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user object
  const user = new User({
    fullname,
    email,
    phone,
    password: hashedPassword,
    role: 'user', // Default role
  });

  try {
    // Save the user to the database
    await user.save();

    // Create a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token as a response
    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Login user
// export const loginUser = async (req, res) => {
//   const { emailOrPhone, password } = req.body;

//   // Check if the user exists by email or phone
//   const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   // Compare the password with the stored hashed password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   // Create a JWT token
//   const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//   // Return the token and user data
//   res.json({ token, user });
// };

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role, // Include role in response
      username: user.username, // Optional: Include username for navbar display
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Default role for customers
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }, // Default role for admins
});

export default mongoose.model('Admin', adminSchema);

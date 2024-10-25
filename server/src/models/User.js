const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'agent', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create initial admin user if none exists
userSchema.statics.createInitialAdmin = async function() {
  const adminExists = await this.findOne({ role: 'admin' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await this.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      phone: '+12345678901',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Initial admin user created');
  }
};

module.exports = mongoose.model('User', userSchema);
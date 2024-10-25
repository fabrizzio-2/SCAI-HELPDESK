const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');
const entityRoutes = require('./routes/entities');
const unitRoutes = require('./routes/units');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/units', unitRoutes);

// Database connection with retry logic
const connectWithRetry = async () => {
  try {
    await mongoose.connect('mongodb://localhost/ticket-system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    // Create initial admin user
    await User.createInitialAdmin();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
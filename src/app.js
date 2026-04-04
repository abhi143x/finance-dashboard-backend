const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Finance Dashboard Backend API is running',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;

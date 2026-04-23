const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');

// Fix for querySrv ECONNREFUSED (DNS issues with Atlas SRV records)
dns.setServers(['8.8.8.8', '8.8.4.4']);
const cors = require('cors');
const logger = require('./middlewares/logger');
const { globalErrorHandler, notFoundHandler } = require('./middlewares/errorHandler');
const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');
const { MONGO_URI } = require('./config');

const app = express();

// --- DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- MIDDLEWARES ---

// CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// --- ROUTES ---

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Student Management System API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// --- ERROR HANDLING ---

// 404 Not Found Handler
app.use(notFoundHandler);

// Global Centralized Error Handler
app.use(globalErrorHandler);

module.exports = app;

mongoose.set('bufferCommands', false); // Disable buffering for all models

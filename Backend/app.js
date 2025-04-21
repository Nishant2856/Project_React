const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Ensure uploads directories exist
const profileUploadsDir = path.join(__dirname, 'uploads', 'profile');
const logoUploadsDir = path.join(__dirname, 'uploads', 'logos');
const resumeUploadsDir = path.join(__dirname, 'uploads', 'resume');

if (!fs.existsSync(profileUploadsDir)) {
  fs.mkdirSync(profileUploadsDir, { recursive: true });
  console.log('Created profile uploads directory');
}

if (!fs.existsSync(logoUploadsDir)) {
  fs.mkdirSync(logoUploadsDir, { recursive: true });
  console.log('Created logo uploads directory');
}

if (!fs.existsSync(resumeUploadsDir)) {
  fs.mkdirSync(resumeUploadsDir, { recursive: true });
  console.log('Created resume uploads directory');
}

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobvault')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const companyJobRoutes = require('./routes/companyJobRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Register routes
console.log('Registering routes...');
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/company-jobs', companyJobRoutes);
app.use('/api/profiles', profileRoutes);
console.log('Routes registered');

// Debug route to list all routes
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  
  // List all explicitly registered routes
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods).map(method => method.toUpperCase())
      });
    } else if (middleware.name === 'router') {
      // Router middleware
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          const path = handler.route.path;
          const basePath = middleware.regexp.toString()
            .replace('\\^', '')
            .replace('\\/?(?=\\/|$)', '')
            .replace(/\\\//g, '/');
            
          routes.push({
            path: basePath.replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ':param') + path,
            methods: Object.keys(handler.route.methods).map(method => method.toUpperCase())
          });
        }
      });
    }
  });
  
  res.json({
    count: routes.length,
    routes
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
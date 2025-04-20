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

if (!fs.existsSync(profileUploadsDir)) {
  fs.mkdirSync(profileUploadsDir, { recursive: true });
  console.log('Created profile uploads directory');
}

if (!fs.existsSync(logoUploadsDir)) {
  fs.mkdirSync(logoUploadsDir, { recursive: true });
  console.log('Created logo uploads directory');
}

// Middleware
app.use(cors());
app.use(express.json());

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

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/company-jobs', companyJobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
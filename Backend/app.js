const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobvault')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applicants', applicantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
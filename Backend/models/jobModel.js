const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A job must have a title'],
    trim: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: [true, 'A job must belong to a company']
  },
  location: {
    type: String,
    required: [true, 'A job must have a location']
  },
  type: {
    type: String,
    required: [true, 'Please specify job type'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  description: {
    type: String,
    required: [true, 'A job must have a description']
  },
  requirements: [{
    type: String,
    required: [true, 'Please specify job requirements']
  }],
  salary: {
    type: String,
    required: [true, 'Please specify salary range']
  },
  experience: {
    type: String,
    required: [true, 'Please specify required experience']
  },
  skills: [{
    type: String,
    required: [true, 'Please specify required skills']
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  applications: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Application'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job; 
const mongoose = require('mongoose');

const companyJobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'A job must belong to a company']
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  years: {
    type: String,
    required: [true, 'Years of experience is required'],
    trim: true
  },
  salary: {
    type: String,
    required: [true, 'Salary information is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  timeAvailability: {
    type: String,
    required: [true, 'Time availability is required'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Contact details are required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  educationInfo: {
    type: String,
    required: [true, 'Education information is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp before saving
companyJobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const CompanyJob = mongoose.model('CompanyJob', companyJobSchema);
module.exports = CompanyJob; 
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: [true, 'Application must belong to a job']
  },
  applicant: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Application must belong to a user']
  },
  resume: {
    type: String,
    required: [true, 'Please provide your resume']
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  },
  experience: {
    type: String,
    required: [true, 'Please provide your relevant experience']
  },
  skills: [{
    type: String,
    required: [true, 'Please provide your relevant skills']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application; 
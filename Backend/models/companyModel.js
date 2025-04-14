const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Company must be associated with a user account']
  },
  name: {
    type: String,
    required: [true, 'Company must have a name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide company description']
  },
  industry: {
    type: String,
    required: [true, 'Please specify company industry']
  },
  location: {
    type: String,
    required: [true, 'Please provide company location']
  },
  website: {
    type: String,
    required: [true, 'Please provide company website']
  },
  logo: {
    type: String,
    default: 'default-company-logo.png'
  },
  size: {
    type: String,
    required: [true, 'Please specify company size'],
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  jobs: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Job'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company; 
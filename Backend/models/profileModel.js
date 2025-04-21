const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Profile must belong to a user'],
    unique: true
  },
  resume: {
    filename: String,
    path: String,
    originalName: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  skills: [String],
  education: {
    degree: String,
    university: String,
    course: String,
    specialization: String,
    duration: String,
    type: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Distance Learning'],
      default: 'Full Time'
    }
  },
  itSkills: {
    name: String,
    version: String,
    lastUsed: String,
    experience: String
  },
  projects: [{
    title: String,
    client: String,
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'On Hold'],
      default: 'In Progress'
    },
    workedFrom: String,
    details: String
  }],
  profileSummary: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field before saving
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile; 
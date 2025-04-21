const express = require('express');
const router = express.Router();
const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');
const CompanyJob = require('../models/companyJobModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      console.log('No token provided in the request');
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. No token provided.' 
      });
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables!');
      return res.status(500).json({ 
        success: false,
        message: 'Server configuration error' 
      });
    }

    try {
      console.log('Verifying token:', token.substring(0, 15) + '...');
      console.log('JWT Secret availability:', !!process.env.JWT_SECRET);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully:', decoded);
      
      // Check if decoded contains an ID
      if (!decoded.id) {
        console.log('Decoded token missing ID:', decoded);
        return res.status(401).json({ 
          success: false,
          message: 'Invalid token format' 
        });
      }
      
      const user = await User.findById(decoded.id);
      
      if (!user) {
        console.log('User not found for token ID:', decoded.id);
        return res.status(401).json({ 
          success: false,
          message: 'User not found' 
        });
      }
      
      req.user = user;
      console.log('User authenticated:', user._id);
      next();
    } catch (error) {
      console.log('Token verification error:', error.message);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during authentication' 
    });
  }
};

// Get all applications for a user
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: 'job',
        select: 'title company',
        populate: {
          path: 'company',
          select: 'name logo'
        }
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all applications for a job (Company only)
router.get('/job/:jobId', async (req, res) => {
  try {
    console.log('Fetching applications for job:', req.params.jobId);
    
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }

    // Check if user is the company that posted the job
    if (req.company && job.company.toString() !== req.company._id.toString()) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized to view these applications' 
      });
    }

    // Fetch applications with populated applicant data
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email mobile logo')
      .populate('job', 'title company')
      .sort('-createdAt');

    console.log(`Found ${applications.length} applications for job ${req.params.jobId}`);

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Apply for a job
router.post('/:jobId', protect, async (req, res) => {
  try {
    console.log('----------------');
    console.log('APPLY FOR JOB REQUEST');
    console.log('User:', req.user?._id, req.user?.name);
    console.log('Job ID:', req.params.jobId);
    console.log('Request body:', req.body);
    console.log('----------------');
    
    // Try to find the job in CompanyJob model first
    let job = await CompanyJob.findById(req.params.jobId);
    let jobModel = 'CompanyJob';
    
    // If not found in CompanyJob, try the Job model
    if (!job) {
      console.log('Job not found in CompanyJob model, trying Job model');
      job = await Job.findById(req.params.jobId);
      jobModel = 'Job';
    }
    
    // If still not found, return error
    if (!job) {
      console.log('Job not found in either model with ID:', req.params.jobId);
      return res.status(404).json({ 
        success: false,
        message: 'Job not found' 
      });
    }
    
    console.log(`Found job in ${jobModel} model: ${job.title}`);

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id
    });

    if (existingApplication) {
      console.log('User has already applied for this job');
      return res.status(400).json({ 
        success: false,
        message: 'You have already applied for this job' 
      });
    }

    // Basic validation
    if (!req.body.resume) {
      return res.status(400).json({
        success: false,
        message: 'Resume is required'
      });
    }

    if (!req.body.experience) {
      return res.status(400).json({
        success: false,
        message: 'Experience details are required'
      });
    }

    if (!req.body.skills || !Array.isArray(req.body.skills) || req.body.skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Skills are required (must be an array)'
      });
    }

    // Create the application
    const applicationData = {
      ...req.body,
      job: req.params.jobId,
      applicant: req.user._id,
      jobModel: jobModel,
      status: 'pending'
    };
    
    console.log('Creating application with data:', applicationData);
    
    const application = await Application.create(applicationData);
    console.log('Application created successfully:', application._id);

    // Add application to job's applications array
    job.applications = job.applications || [];
    job.applications.push(application._id);
    await job.save();
    console.log('Job updated with new application reference');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: errors.join(', '),
        details: error.errors
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// Update application status (Company only)
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const job = await Job.findById(application.job);
    if (job.company.toString() !== req.company._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this application' });
    }

    application.status = req.body.status;
    await application.save();

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Withdraw application
router.delete('/:id', protect, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to withdraw this application' });
    }

    // Remove application from job's applications array
    const job = await Job.findById(application.job);
    job.applications = job.applications.filter(
      appId => appId.toString() !== application._id.toString()
    );
    await job.save();

    await application.remove();

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Check if user has applied to a job
router.get('/check/:jobId', protect, async (req, res) => {
  try {
    console.log(`Checking if user ${req.user._id} has applied to job ${req.params.jobId}`);
    
    const application = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id
    });
    
    res.status(200).json({
      success: true,
      hasApplied: !!application,
      application: application
    });
  } catch (error) {
    console.error('Error checking application status:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 
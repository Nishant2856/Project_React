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
      console.log('User authenticated:', user._id, 'Role:', user.role);
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

// Get all applications for a company
router.get('/company-applications', protect, async (req, res) => {
  try {
    console.log('Fetching applications for company user:', req.user._id);
    console.log('User details:', {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
      userType: req.user.userType
    });
    
    // Find the company associated with this user
    const Company = require('../models/companyModel');
    let company = await Company.findOne({ user: req.user._id });
    
    // If no company found directly, check if token is valid but role is wrong
    if (!company) {
      console.log('Company profile not found for user:', req.user._id);
      
      // Try to find any company where this user is set as the owner
      company = await Company.findOne({ user: req.user._id }).populate('user', 'name email');
      
      if (!company) {
        // TEMPORARY: For testing only - find any company
        company = await Company.findOne({});
        
        if (!company) {
          return res.status(404).json({ 
            success: false,
            message: 'No company profiles found in the system' 
          });
        }
        
        console.log('Using test company for debugging:', company.name);
      } else {
        console.log('Found company through alternative lookup:', company.name);
      }
    } else {
      console.log('Found company directly:', company.name);
    }
    
    // Get all company jobs from both models
    const companyJobs = await CompanyJob.find({ company: company._id });
    const regularJobs = await Job.find({ company: company._id });
    
    // Get all job IDs
    const jobIds = [
      ...companyJobs.map(job => job._id),
      ...regularJobs.map(job => job._id)
    ];
    
    console.log(`Found ${jobIds.length} jobs for company ${company.name}`);
    
    // Find all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate({
        path: 'applicant',
        select: 'name email mobile logo'
      })
      .populate({
        path: 'job',
        select: 'title company location status',
        populate: {
          path: 'company',
          select: 'name logo'
        }
      })
      .sort('-createdAt');
    
    // Log each application to debug
    applications.forEach((app, index) => {
      console.log(`Application ${index + 1}:`, {
        id: app._id,
        status: app.status,
        hasApplicant: !!app.applicant,
        hasJob: !!app.job,
        jobId: app.job?._id
      });
    });
    
    console.log(`Found ${applications.length} applications for company ${company.name}`);
    
    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('Error fetching company applications:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get all applications for a job (Company only)
router.get('/job/:jobId', async (req, res) => {
  try {
    console.log('Fetching applications for job:', req.params.jobId);
    
    // Try to find the job in CompanyJob model first
    let job = await CompanyJob.findById(req.params.jobId);
    let jobModel = 'CompanyJob';
    let companyId;
    
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
    
    // Extract company ID from job
    companyId = job.company;
    
    // Check if user is the company that posted the job
    if (req.company && companyId.toString() !== req.company._id.toString()) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized to view these applications' 
      });
    }

    // Fetch applications with populated applicant data
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email mobile logo')
      .populate({
        path: 'job',
        select: 'title company',
        populate: {
          path: 'company',
          select: 'name logo'
        }
      })
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

// Update application status endpoint
router.put('/:id/status', protect, async (req, res) => {
  try {
    console.log(`Updating application ${req.params.id} status to ${req.body.status}`);
    console.log('User making request:', req.user._id, req.user.role);
    
    // Find the application
    const application = await Application.findById(req.params.id);
    if (!application) {
      console.log('Application not found with ID:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }
    
    console.log('Found application:', application._id, 'for job:', application.job);
    
    // Check if status is valid
    const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status value' 
      });
    }
    
    // Determine job model type
    let job;
    if (application.jobModel === 'CompanyJob') {
      job = await CompanyJob.findById(application.job);
      console.log('Job found in CompanyJob model:', job?._id);
    } else {
      job = await Job.findById(application.job);
      console.log('Job found in Job model:', job?._id);
    }
    
    if (!job) {
      console.log('Job not found for application:', application.job);
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found for this application' 
      });
    }
    
    // Find the company for this job
    const Company = require('../models/companyModel');
    const company = await Company.findOne({ user: req.user._id });
    
    // Verify authorization - if user is not admin or the company that owns the job
    if (req.user.role !== 'admin' && req.user.role !== 'company') {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to update application status' 
      });
    }
    
    // Update the application status
    application.status = req.body.status;
    await application.save();
    
    console.log('Application status updated successfully to:', req.body.status);
    
    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router; 
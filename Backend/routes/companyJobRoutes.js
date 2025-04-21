const express = require('express');
const router = express.Router();
const CompanyJob = require('../models/companyJobModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Middleware to protect routes - only companies can access
const protectCompanyRoute = async (req, res, next) => {
  try {
    // Check for token in headers
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user is a company
    if (user.role !== 'company') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized as a company'
      });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

// Get all jobs for a company
router.get('/my-jobs', protectCompanyRoute, async (req, res) => {
  try {
    // Find the company profile for this user
    const company = await require('../models/companyModel').findOne({ user: req.user._id });
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found for this user'
      });
    }
    
    const jobs = await CompanyJob.find({ company: company._id })
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single job by ID
router.get('/:id', protectCompanyRoute, async (req, res) => {
  try {
    const job = await CompanyJob.findById(req.params.id)
      .populate({
        path: 'applications',
        select: 'applicant status experience skills resume coverLetter createdAt',
        populate: {
          path: 'applicant',
          select: 'name email mobile logo'
        }
      });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Find the company profile for this user
    const company = await require('../models/companyModel').findOne({ user: req.user._id });
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found for this user'
      });
    }
    
    // Check if the job belongs to the company
    if (job.company.toString() !== company._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this job'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create a new job
router.post('/', protectCompanyRoute, async (req, res) => {
  try {
    // First find the company profile for this user
    const company = await require('../models/companyModel').findOne({ user: req.user._id });
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found for this user'
      });
    }
    
    // Create job with company ID from the company profile
    const job = await CompanyJob.create({
      ...req.body,
      company: company._id // Use company._id instead of req.user._id
    });
    
    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update a job
router.put('/:id', protectCompanyRoute, async (req, res) => {
  try {
    // Find the company profile for this user
    const company = await require('../models/companyModel').findOne({ user: req.user._id });
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found for this user'
      });
    }
    
    let job = await CompanyJob.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Check if the job belongs to the company
    if (job.company.toString() !== company._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }
    
    // Update job
    job = await CompanyJob.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete a job
router.delete('/:id', protectCompanyRoute, async (req, res) => {
  try {
    // Find the company profile for this user
    const company = await require('../models/companyModel').findOne({ user: req.user._id });
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found for this user'
      });
    }
    
    const job = await CompanyJob.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Check if the job belongs to the company
    if (job.company.toString() !== company._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }
    
    await job.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all jobs (public route for browsing)
router.get('/', async (req, res) => {
  try {
    const jobs = await CompanyJob.find({ isActive: true })
      .populate('company', 'name logo')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get job details by ID (public route)
router.get('/details/:id', async (req, res) => {
  try {
    const job = await CompanyJob.findById(req.params.id)
      .populate('company', 'name logo website rating')
      .populate({
        path: 'applications',
        select: 'applicant status createdAt',
        populate: {
          path: 'applicant',
          select: 'name email mobile logo'
        }
      })
      .lean();
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job details'
    });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const Company = require('../models/companyModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = 'uploads/logos';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, `company-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2 MB limit
  },
  fileFilter: fileFilter
});

// Company Signup with file upload
router.post('/signup', upload.single('logo'), async (req, res) => {
  try {
    // Extract user data from request
    const { name, email, password, mobile, about, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Remove uploaded file if exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create a new user with company role
    const user = await User.create({
      name,
      email,
      password,
      mobile,
      role: 'company' // Force role to be company
    });
    
    // Create company profile
    const company = await Company.create({
      user: user._id,
      name,
      description: about || `${name} - Company profile`,
      industry: req.body.industry || 'Technology',
      location: req.body.location || 'Remote',
      website: req.body.website || 'https://example.com',
      size: req.body.size || '1-10',
      // Set logo path if file was uploaded
      logo: req.file ? req.file.path : 'uploads/logos/default-company-logo.png'
    });
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    
    // Return success response
    res.status(201).json({
      success: true,
      token,
      company: {
        id: company._id,
        name: company.name,
        logo: company.logo,
        user: user._id
      }
    });
  } catch (error) {
    // Remove uploaded file if exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Company Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user with the email
    const user = await User.findOne({ email, role: 'company' }).select('+password');
    
    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials or not a company account' 
      });
    }
    
    // Find the corresponding company profile
    const company = await Company.findOne({ user: user._id });
    
    if (!company) {
      return res.status(404).json({ 
        success: false,
        message: 'Company profile not found' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    
    // Return success response
    res.status(200).json({
      success: true,
      token,
      company: {
        id: company._id,
        name: company.name,
        logo: company.logo,
        user: user._id
      }
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find()
      .populate('jobs')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single company
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate({
        path: 'jobs',
        select: 'title type location status createdAt'
      });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create company profile
router.post('/', async (req, res) => {
  try {
    // Check if company profile already exists for user
    const existingCompany = await Company.findOne({ user: req.user._id });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company profile already exists' });
    }

    const company = await Company.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      company
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update company profile
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this profile' });
    }

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      company: updatedCompany
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete company profile
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this profile' });
    }

    await company.remove();

    res.status(200).json({
      success: true,
      message: 'Company profile deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search companies
router.get('/search', async (req, res) => {
  try {
    const { keyword, industry, location } = req.query;
    const queryObject = {};

    if (keyword) {
      queryObject.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (industry) {
      queryObject.industry = { $regex: industry, $options: 'i' };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: 'i' };
    }

    const companies = await Company.find(queryObject)
      .populate('jobs')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
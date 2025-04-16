const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = 'uploads/profile';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
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

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Register user with file upload
router.post('/signup', upload.single('logo'), async (req, res) => {
  try {
    // Debug the incoming request
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    // Create user with form data
    const userData = {
      ...req.body,
      // Set logo path if file was uploaded
      logo: req.file ? req.file.path : 'uploads/profile/default-profile.png'
    };
    
    console.log('User data being saved:', userData);
    
    const user = await User.create(userData);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        logo: user.logo,
        role: user.role,
        userType: user.userType,
        address: user.address
      }
    });
  } catch (error) {
    console.error('User signup error:', error);
    
    // Format validation errors for better client-side display
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      // Format mongoose validation errors
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });
      
      console.log('Validation errors:', validationErrors);
      
      // Send back a formatted error message
      const errorMessage = Object.values(validationErrors).join(', ');
      return res.status(400).json({ 
        message: errorMessage,
        validationErrors
      });
    }
    
    // Remove uploaded file if exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        logo: user.logo,
        role: user.role,
        userType: user.userType,
        address: user.address
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user details with file upload
router.put('/update', protect, upload.single('logo'), async (req, res) => {
  try {
    // Prepare update data
    const updateData = {...req.body};
    
    // Update logo if file was uploaded
    if (req.file) {
      // Delete old logo if it's not the default
      if (req.user.logo && req.user.logo !== 'uploads/profile/default-profile.png') {
        try {
          fs.unlinkSync(req.user.logo);
        } catch (error) {
          console.error('Error deleting old logo:', error);
        }
      }
      updateData.logo = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    // Remove uploaded file if exists and there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
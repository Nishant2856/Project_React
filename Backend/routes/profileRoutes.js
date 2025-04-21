const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
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

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user exists
      const User = require('../models/userModel');
      const currentUser = await User.findById(decoded.id);
      
      if (!currentUser) {
        return res.status(401).json({ 
          success: false,
          message: 'The user belonging to this token no longer exists' 
        });
      }
      
      // Attach user to request
      req.user = currentUser;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

// Routes for profile management

// Get current user's profile
router.get('/my-profile', protect, profileController.getMyProfile);

// Get profile by user ID (for admin or company)
router.get('/user/:userId', profileController.getProfileById);

// Update current user's profile (without resume)
router.put('/update', protect, profileController.updateMyProfile);

// Update current user's profile with resume
router.put('/update-with-resume', protect, profileController.uploadResume, profileController.updateMyProfile);

// Project management routes
router.post('/projects', protect, profileController.addProject);
router.put('/projects/:projectId', protect, profileController.updateProject);
router.delete('/projects/:projectId', protect, profileController.deleteProject);

// Get resume file
router.get('/resume/:userId', profileController.getResume);

module.exports = router; 
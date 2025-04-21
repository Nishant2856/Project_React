const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/resumes';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename using timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'resume-' + uniqueSuffix + ext);
  }
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX and RTF files are allowed.'), false);
  }
};

// Set up multer with our configuration
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Helper function for handling file upload
exports.uploadResume = upload.single('resume');

// Get the profile for the current user
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(`Fetching profile for user: ${userId}`);

    // Find profile or create a new one if it doesn't exist
    let profile = await Profile.findOne({ applicant: userId });
    
    if (!profile) {
      console.log(`No profile found, creating default profile for user: ${userId}`);
      profile = await Profile.create({
        applicant: userId,
        skills: [],
        projects: [{
          title: '',
          client: '',
          status: 'In Progress',
          workedFrom: '',
          details: ''
        }]
      });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get profile by user ID (for admin or company to view applicant profiles)
exports.getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching profile for user ID: ${userId}`);

    const profile = await Profile.findOne({ applicant: userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Include basic user info with the profile
    const user = await User.findById(userId).select('name email mobile');

    res.status(200).json({
      success: true,
      profile,
      user
    });
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update the current user's profile
exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(`Updating profile for user: ${userId}`);
    
    const updateData = { ...req.body };
    
    // Parse JSON strings from FormData if they exist
    if (updateData.skills && typeof updateData.skills === 'string') {
      try {
        updateData.skills = JSON.parse(updateData.skills);
      } catch (e) {
        console.error('Error parsing skills:', e);
      }
    }
    
    if (updateData.education && typeof updateData.education === 'string') {
      try {
        updateData.education = JSON.parse(updateData.education);
      } catch (e) {
        console.error('Error parsing education:', e);
      }
    }
    
    if (updateData.itSkills && typeof updateData.itSkills === 'string') {
      try {
        updateData.itSkills = JSON.parse(updateData.itSkills);
      } catch (e) {
        console.error('Error parsing itSkills:', e);
      }
    }
    
    if (updateData.projects && typeof updateData.projects === 'string') {
      try {
        updateData.projects = JSON.parse(updateData.projects);
      } catch (e) {
        console.error('Error parsing projects:', e);
      }
    }
    
    // Handle resume file if uploaded
    if (req.file) {
      updateData.resume = {
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname,
        uploadDate: Date.now()
      };
    }
    
    // Find and update profile, create if it doesn't exist
    let profile = await Profile.findOne({ applicant: userId });
    
    if (profile) {
      // For nested objects like education or itSkills, merge rather than replace
      if (updateData.education && typeof updateData.education === 'object') {
        updateData.education = { ...profile.education.toObject(), ...updateData.education };
      }
      
      if (updateData.itSkills && typeof updateData.itSkills === 'object') {
        updateData.itSkills = { ...profile.itSkills.toObject(), ...updateData.itSkills };
      }
      
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { applicant: userId },
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      updateData.applicant = userId;
      profile = await Profile.create(updateData);
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add a project to the profile
exports.addProject = async (req, res) => {
  try {
    const userId = req.user._id;
    let projectData = req.body;
    
    // Parse projectData if it's a JSON string
    if (projectData && typeof projectData === 'string') {
      try {
        projectData = JSON.parse(projectData);
      } catch (e) {
        console.error('Error parsing project data:', e);
      }
    }
    
    // Find profile
    let profile = await Profile.findOne({ applicant: userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found. Please create your profile first.'
      });
    }
    
    // Add project to the projects array
    profile.projects.push(projectData);
    await profile.save();
    
    res.status(200).json({
      success: true,
      message: 'Project added successfully',
      profile
    });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update a specific project
exports.updateProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;
    let projectData = req.body;
    
    // Parse projectData if it's a JSON string
    if (projectData && typeof projectData === 'string') {
      try {
        projectData = JSON.parse(projectData);
      } catch (e) {
        console.error('Error parsing project data:', e);
      }
    }
    
    // Find profile
    let profile = await Profile.findOne({ applicant: userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    // Find the project index
    const projectIndex = profile.projects.findIndex(
      project => project._id.toString() === projectId
    );
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Update the project
    profile.projects[projectIndex] = {
      ...profile.projects[projectIndex].toObject(),
      ...projectData
    };
    
    await profile.save();
    
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      profile
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;
    
    // Find and update profile to remove the project
    const profile = await Profile.findOneAndUpdate(
      { applicant: userId },
      { $pull: { projects: { _id: projectId } } },
      { new: true }
    );
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      profile
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get the resume file
exports.getResume = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const profile = await Profile.findOne({ applicant: userId });
    
    if (!profile || !profile.resume || !profile.resume.path) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    // Send file
    res.sendFile(path.resolve(profile.resume.path));
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 
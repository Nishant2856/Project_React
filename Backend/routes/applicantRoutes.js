const express = require('express');
const router = express.Router();
const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');

// Get all applications for a user
router.get('/my-applications', async (req, res) => {
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
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the company that posted the job
    if (job.company.toString() !== req.company._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email')
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

// Apply for a job
router.post('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = await Application.create({
      ...req.body,
      job: req.params.jobId,
      applicant: req.user._id
    });

    // Add application to job's applications array
    job.applications.push(application._id);
    await job.save();

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
router.delete('/:id', async (req, res) => {
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

module.exports = router; 
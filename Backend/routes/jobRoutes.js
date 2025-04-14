const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const Company = require('../models/companyModel');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name location logo')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name description location website logo size')
      .populate('applications');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new job (Company only)
router.post('/', async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    if (!company) {
      return res.status(401).json({ message: 'Only companies can post jobs' });
    }

    const job = await Job.create({
      ...req.body,
      company: company._id
    });

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.company.toString() !== company._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      job: updatedJob
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user._id });
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.company.toString() !== company._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await job.remove();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search jobs
router.get('/search', async (req, res) => {
  try {
    const { keyword, location, type } = req.query;
    const queryObject = {};

    if (keyword) {
      queryObject.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (location) {
      queryObject.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      queryObject.type = type;
    }

    const jobs = await Job.find(queryObject)
      .populate('company', 'name location logo')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
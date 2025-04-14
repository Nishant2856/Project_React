const express = require('express');
const router = express.Router();
const Company = require('../models/companyModel');

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
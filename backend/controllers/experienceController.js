const Experience = require('../models/Experience');

// @desc    Get all experience entries (supports ?type=)
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type && type !== 'All') filter.type = type;

    const experiences = await Experience.find(filter).sort({ startDate: -1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single experience entry
// @route   GET /api/experience/:id
// @access  Public
const getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience entry not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience entry
// @route   POST /api/experience
// @access  Private (Admin)
const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience entry
// @route   PUT /api/experience/:id
// @access  Private (Admin)
const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience entry not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience entry
// @route   DELETE /api/experience/:id
// @access  Private (Admin)
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience entry not found' });
    }
    await experience.deleteOne();
    res.status(200).json({ success: true, message: 'Experience entry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};

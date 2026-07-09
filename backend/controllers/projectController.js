const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// @desc    Get all projects (supports ?search=&category=&technology=)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { search, category, technology } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (technology) {
      filter.technologies = { $regex: technology, $options: 'i' };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const projects = await Project.find(filter).sort({ date: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // technologies may arrive as comma-separated string from multipart form
    if (typeof data.technologies === 'string') {
      data.technologies = data.technologies.split(',').map((t) => t.trim());
    }

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(data);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (typeof data.technologies === 'string') {
      data.technologies = data.technologies.split(',').map((t) => t.trim());
    }

    const existing = await Project.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (req.file) {
      // remove old image file if it exists locally
      if (existing.image) {
        const oldPath = path.join(__dirname, '..', existing.image);
        fs.unlink(oldPath, () => {});
      }
      data.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.image) {
      const imgPath = path.join(__dirname, '..', project.image);
      fs.unlink(imgPath, () => {});
    }

    await project.deleteOne();
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };

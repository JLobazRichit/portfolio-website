const Certificate = require('../models/Certificate');
const fs = require('fs');
const path = require('path');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;

    const certificates = await Certificate.find(filter).sort({ date: -1 });
    res.status(200).json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Public
const getCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

// @desc    Create certificate
// @route   POST /api/certificates
// @access  Private (Admin)
const createCertificate = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const certificate = await Certificate.create(data);
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin)
const updateCertificate = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const existing = await Certificate.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    if (req.file) {
      if (existing.image) {
        fs.unlink(path.join(__dirname, '..', existing.image), () => {});
      }
      data.image = `/uploads/${req.file.filename}`;
    }

    const certificate = await Certificate.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin)
const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    if (certificate.image) {
      fs.unlink(path.join(__dirname, '..', certificate.image), () => {});
    }

    await certificate.deleteOne();
    res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};

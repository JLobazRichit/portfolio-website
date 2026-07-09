const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const experienceValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('organization').trim().notEmpty().withMessage('Organization is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('startDate').notEmpty().isISO8601().withMessage('Valid start date is required'),
];

router.get('/', getExperiences);
router.get('/:id', getExperience);
router.post('/', protect, experienceValidation, validate, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;

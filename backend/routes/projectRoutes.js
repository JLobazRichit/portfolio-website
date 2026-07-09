const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const upload = require('../config/multer');

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Date must be valid'),
];

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, upload.single('image'), projectValidation, validate, createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

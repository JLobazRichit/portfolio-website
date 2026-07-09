const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const upload = require('../config/multer');

const certificateValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('organization').trim().notEmpty().withMessage('Organization is required'),
  body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Date must be valid'),
];

router.get('/', getCertificates);
router.get('/:id', getCertificate);
router.post('/', protect, upload.single('image'), certificateValidation, validate, createCertificate);
router.put('/:id', protect, upload.single('image'), updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;

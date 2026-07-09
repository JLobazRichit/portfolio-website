const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { contactLimiter } = require('../middleware/rateLimiter');

const messageValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

router.post('/', contactLimiter, messageValidation, validate, createMessage);
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;

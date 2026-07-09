const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { login, logout, refresh, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post(
  '/login',
  loginLimiter,
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.post('/logout', protect, logout);
router.post('/refresh', refresh);
router.get('/me', protect, getMe);

module.exports = router;

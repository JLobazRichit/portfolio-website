const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    admin.refreshToken = refreshToken;
    await admin.save();

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      accessToken,
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout admin - clears refresh token
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await Admin.findOneAndUpdate({ refreshToken }, { $unset: { refreshToken: 1 } });
    }

    res.clearCookie('refreshToken', cookieOptions);
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Issue new access token using refresh token cookie
// @route   POST /api/auth/refresh
// @access  Public (requires valid refresh cookie)
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id).select('+refreshToken');

    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ success: false, message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(admin._id);
    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Refresh token expired or invalid' });
  }
};

// @desc    Get currently logged-in admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({ success: true, admin: { id: req.admin._id, username: req.admin.username, email: req.admin.email } });
};

module.exports = { login, logout, refresh, getMe };

const jwt = require('jsonwebtoken');

// Short-lived access token, sent in Authorization header by the frontend
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m',
  });
};

// Long-lived refresh token, stored hashed/plain on the Admin doc and set as httpOnly cookie
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
  });
};

module.exports = { generateAccessToken, generateRefreshToken };

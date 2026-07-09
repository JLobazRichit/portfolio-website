const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a contact form message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({ name, email, subject, message });

    // Attempt email notification; do not fail the request if email sending fails
    try {
      await sendEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error('Email notification failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. Thank you for reaching out!',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private (Admin)
const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await message.deleteOne();
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage, getMessages, markAsRead, deleteMessage };

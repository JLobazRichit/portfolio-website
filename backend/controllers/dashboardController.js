const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Experience = require('../models/Experience');
const Message = require('../models/Message');

// @desc    Get admin dashboard summary stats
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
const getStats = async (req, res, next) => {
  try {
    const [projectCount, certificateCount, experienceCount, messageCount, unreadCount] =
      await Promise.all([
        Project.countDocuments(),
        Certificate.countDocuments(),
        Experience.countDocuments(),
        Message.countDocuments(),
        Message.countDocuments({ isRead: false }),
      ]);

    const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        projectCount,
        certificateCount,
        experienceCount,
        messageCount,
        unreadCount,
        recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };

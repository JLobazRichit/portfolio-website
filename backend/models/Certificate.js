const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    image: {
      type: String,
      default: '',
    },
    organization: {
      type: String,
      required: [true, 'Issuing organization is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Certificate date is required'],
    },
    certificateLink: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['AI/ML', 'Programming', 'IoT', 'Virtual Internship', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);

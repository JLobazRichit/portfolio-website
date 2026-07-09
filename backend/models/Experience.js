const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Internship', 'Workshop', 'Hackathon', 'Event', 'NCC', 'Achievement'],
      default: 'Event',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [800, 'Description cannot exceed 800 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

experienceSchema.index({ startDate: -1 });

module.exports = mongoose.model('Experience', experienceSchema);

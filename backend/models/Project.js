const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one technology must be specified',
      },
    },
    image: {
      type: String, // stored path/URL of uploaded image
      default: '',
    },
    githubLink: {
      type: String,
      trim: true,
    },
    liveDemo: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['IoT', 'Web Development', 'AI/ML', 'Full Stack', 'Embedded Systems', 'Other'],
      default: 'Other',
    },
    date: {
      type: Date,
      required: [true, 'Project date is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for search/filter performance
projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long']
    },
    target: {
      type: Number,
      required: [true, 'Target is required'],
      min: [1, 'Target must be at least 1']
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true,
      default: 'reps'
    },
    status: {
      type: String,
      enum: ['planned', 'active', 'completed'],
      default: 'planned'
    },
    progress: {
      type: Number,
      min: [0, 'Progress cannot be negative'],
      default: 0
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', challengeSchema);

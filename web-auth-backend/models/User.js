const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  age: Number,

  gender: String,

  height: Number,

  weight: Number,

  fitnessGoal: String,

  medicalCondition: String,

  allergies: String,

  injuries: String,

  streak: {
    type: Number,
    default: 0
  },

  xp: {
    type: Number,
    default: 0
  },

  badge: {
    type: String,
    default: "Beginner Yogi"
  },

  lastCompletedDate: {
    type: Date,
    default: null
  },

  profileCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
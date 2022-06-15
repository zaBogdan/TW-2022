const { Schema, model } = require('mongoose');

const authSchema = new Schema({
  userId: {
    type: String,
    default: 1,
    required: true,
  },
  type: {
    type: Number,
    default: 1,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  suspended: {
    type: Boolean,
    default: false,
    required: true,
  },
}, { collection: 'authentication' });

module.exports = model('authentication', authSchema);
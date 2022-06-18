const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
}, { collection: 'users' });

module.exports = model('users', userSchema);
const { Schema, model } = require('mongoose');

const domainSchema = new Schema({
  userId: {
    type: String,
    default: 1,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  users: [{
    type: String,
    required: true,
  }],
  activeUrl: [{
    type: String
  }],
  registeredAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
}, { collection: 'domains' });

module.exports = model('domains', domainSchema);
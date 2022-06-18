const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  userId: {
    type: String,
    default: 1,
    required: true,
  },
  activeDomain: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
}, { collection: 'events' });

module.exports = model('events', eventSchema);
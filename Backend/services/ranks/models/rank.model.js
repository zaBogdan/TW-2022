const { Schema, model } = require('mongoose');

const rankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  activeDomain: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  score: {
    type: Number,
    default: 1000,
    required: true,
  },
  rankTo: {
    type: String,
    required: true
  }
}, { collection: 'ranks' });

module.exports = model('ranks', rankSchema);
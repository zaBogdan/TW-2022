const { Schema, model } = require('mongoose');

const achievementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default:  10,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: 'cup.png',
  },
  activeDomain: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { collection: 'achievements' });

module.exports = model('achievements', achievementSchema);
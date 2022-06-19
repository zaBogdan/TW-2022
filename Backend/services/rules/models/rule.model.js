const { Schema, model } = require('mongoose');
const ExpressionSchema = require('./expression.model');
const RewardSchema = require('./reward.model');


const ruleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  activeDomain: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  involvedEvents: [{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  reward: {
    type: RewardSchema,
    required: true
  },
  match: {
    type: String,
    required: true,
    default: 'all'
  },
  rule: [{
    type: ExpressionSchema
  }] 
}, { collection: 'rules' });

module.exports = model('rules', ruleSchema);
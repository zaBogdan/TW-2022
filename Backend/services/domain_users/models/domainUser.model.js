const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  latest: {
    type: Date,
    required: true,
    default: new Date()
  },
  data: [{
    type: Number
  }]
}, {
  _id: false,
  __v: false
})

const domainUserSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  listenerId: {
    type: String,
    required: true,
  },
  activeDomain: {
    type: ObjectId,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
  events: {
    type: Map,
    of: EventSchema,
    default: {}
  },
  achievements: [{
    type: ObjectId
  }],
  rank: {
    type: String,
    required: true
  }
}, { collection: 'domain_users' });

module.exports = model('domain_users', domainUserSchema);
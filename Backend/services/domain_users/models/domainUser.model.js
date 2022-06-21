const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  latest: {
    type: Number,
    required: true,
    default: (new Date()).getTime()
  },
  data: [{
    type: Number
  }]
}, {
  _id: false,
  __v: false
})

const domainUserSchema = new Schema({
  listenerId: {
    type: String,
    required: true,
  },
  activeDomain: {
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId
  }],
  active: {
    default: true,
    type: Boolean,
  },
  latestMessage: {
    type: String,
    default: 'Success'
  },
  rank: {
    type: String,
    default: 'default',
    required: true
  }
}, { collection: 'domain_users' });

module.exports = model('domain_users', domainUserSchema);
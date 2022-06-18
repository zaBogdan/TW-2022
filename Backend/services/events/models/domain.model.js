const { Schema, model } = require('mongoose');

const domainSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
}, { collection: 'domains' });

module.exports = model('domains', domainSchema);
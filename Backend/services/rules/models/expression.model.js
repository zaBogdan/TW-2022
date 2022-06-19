const { Schema } = require('mongoose');

const ExpressionSchema = new Schema({
    event: {
      type: String,
      required: true,
    },
    comparator: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },{
    _id: false,
    __v: false
})

module.exports = ExpressionSchema;
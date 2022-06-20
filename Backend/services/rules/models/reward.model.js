const { Schema } = require('mongoose');

const RewardSchema = new Schema({
    type : {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0
    },
    objectId: {
      type: Schema.Types.ObjectId,
    }
}, {
    _id: false,
    __v: false
});

module.exports = RewardSchema;

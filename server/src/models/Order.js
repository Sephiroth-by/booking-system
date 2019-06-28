const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session'
  },
  seats: [[Number]],
  total: Number,
  createdDate: Date,
});

module.exports = mongoose.model('Session', SessionSchema);

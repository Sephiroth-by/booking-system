const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  sessionId: Schema.Types.ObjectId,
  seats: [[Number]],
  total: Number,
  createdDate: Date,
});

module.exports = mongoose.model('Session', SessionSchema);

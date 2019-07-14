const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  state: String,
  total: Number,
  createdDate: Date,
  modifiedDate: Date,
  sessionId: Schema.Types.ObjectId,
  seats: [[Number]],
  price: Number,
});

module.exports = mongoose.model('Order', OrderSchema);

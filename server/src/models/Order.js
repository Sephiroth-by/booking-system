const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: Schema.Types.ObjectId,
  state: String,
  total: Number,
  reservations: [{
    sessionId: Schema.Types.ObjectId,
    seats: [[Number]],
    price: Number,
    total: Number,
  }],
  createdDate: Date,
  modifiedDate: Date,
});

module.exports = mongoose.model('Order', OrderSchema);

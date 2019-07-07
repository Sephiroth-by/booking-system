const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema({
  cinemaId: Schema.Types.ObjectId,
  movieId: Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  price: Number,
  seats: [[Number]],
  seatsAvailable: Number,
  reservations: [{
    orderId: Schema.Types.ObjectId,
    seats: [[Number]],
    price: Number,
    total: Number,
  }],
});

module.exports = mongoose.model('Session', SessionSchema);

const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservationSchema = new Schema({
  seats: [[Number]],
  total: Number
});

const SessionSchema = new Schema({
  cinema: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema'
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  },
  startDate: Date,
  endDate: Date,
  price: Number,
  seatsAvailable: Number,
  seats: [[Number]],
  reservations: [ReservationSchema]
});

module.exports = mongoose.model('Session', SessionSchema);

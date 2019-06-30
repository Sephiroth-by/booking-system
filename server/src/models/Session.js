const mongoose = require('mongoose');
const {Schema} = mongoose;

const SessionSchema = new Schema({
  cinemaId: Schema.Types.ObjectId,
  movieId: Schema.Types.ObjectId,
  schedule: [{
    startTime: Date,
    endTime: Date,
    price: Number,
    seats: [[Number]],
    seatsAvailable: Number,
  }]
});

module.exports = mongoose.model('Session', SessionSchema);

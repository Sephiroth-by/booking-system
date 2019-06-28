const mongoose = require('mongoose');
const {Schema} = mongoose;

const CinemaSchema = new Schema({
  city: String,
  name: String,
  seats: [[Number]],
  seatsAvailable: Number
});

module.exports = mongoose.model('Cinema', CinemaSchema);

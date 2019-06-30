const Session = require('../models/Session');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');

const populateTestData = () => {
  let cinema = new Cinema({
    city: 'Minsk',
    name: 'Silverscreen',
    seats: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    seatsAvailable: 9,
  });
  cinema.save();

  let movie = new Movie({
    name: 'Men in black',
    description: 'Cool movie',
    poster: '/images/mib.jpg',
  });
  movie.save();

  let today = new Date();
  let sessionStartDate = new Date();
  let sessionEndDate = new Date();
  sessionStartDate.setDate(today.getDate() + 3);
  sessionEndDate.setDate(sessionStartDate.getDate() + 1);

  let session = new Session({
    cinemaId: cinema._id,
    movieId: movie._id,
    startTime: sessionStartDate.toISOString(),
    endTime: sessionEndDate.toISOString(),
    price: 10,
    seats: [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
    seatsAvailable: 6,
  });
  session.save();
};

module.exports = populateTestData;

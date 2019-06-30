const router = require('express').Router();
const Session = require('../models/Session');
const Movie = require('../models/Movie');

// const Cinema = require('../models/Cinema');

// var cinema = new Cinema({
//   city: 'Minsk',
//   name: 'Silverscreen',
//   seats: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
//   seatsAvailable: 9
// });
// cinema.save();

// var movie = new Movie({
//   name: 'Men in black',
//   description: 'Cool movie',
//   poster: '/images/mib.jpg'
// });
// movie.save();

// var today = new Date();
// var sessionStartDate = new Date();
// var sessionEndDate = new Date();
// sessionStartDate.setDate(today.getDate() + 3);
// sessionEndDate.setDate(sessionStartDate.getDate() + 4);

// var session = new Session({
//   cinemaId: cinema._id,
//   movieId: movie._id,
//   schedule: [{
//     startTime: sessionStartDate.toISOString(),
//     endTime: sessionEndDate.toISOString(),
//     price: 10,
//     seats: [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
//     seatsAvailable: 6,
//   }]
// });
// session.save();

router.get('/', async (req, res) => {
  const searchTerm = req.query.term;
  let movies = [];

  var movieIds = (await Session.find({
    schedule: {
      $elemMatch: {
        startTime: {
          $gt: new Date().toISOString()
        }
      }
    }
  })).map((s) => {
    return s.movieId;
  });

  if (!searchTerm) {
    movies = await Movie.find({
      _id: {
        $in: movieIds
      }
    });
  }

  else {
    movies = await Movie.find({
      $and: [{
        _id: {
          $in: movieIds
        },
      },
      {
        name: {
          $regex: searchTerm, $options: 'i'
        }
      }
      ]
    });
  }

  res.json(movies);
});

module.exports = router;

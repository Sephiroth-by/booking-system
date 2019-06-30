const router = require('express').Router();
const Session = require('../models/Session');
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  const searchTerm = req.query.term;
  let movies = [];

  let movieIds = (await Session.find({
    startTime: {
      $gt: new Date().toISOString(),
    },
  })).map((s) => s.movieId);

  if (!searchTerm) {
    movies = await Movie.find({
      _id: {
        $in: movieIds,
      },
    });
  }

  else {
    movies = await Movie.find({
      $and: [{
        _id: {
          $in: movieIds,
        },
      },
      {
        name: {
          $regex: searchTerm,
$options: 'i',
        },
      },
      ],
    });
  }

  res.json(movies);
});

module.exports = router;

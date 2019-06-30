const router = require('express').Router();
const authMiddleware = require('../helpers/authMiddleware');
const Movie = require('../models/Movie');
const Session = require('../models/Session');

router.get('/:movieId', authMiddleware, async (req, res) => {
  const movieId = req.params.movieId;

  if (!movieId) {
    return res.status(400).json({
      error: 'Movie id missing',
    });
  }

  const movie = await Movie.findOne({
    _id: movieId,
  });

  if(!movie) {
    res.status(404).json({
      error: 'No movie found',
    });
  }

  const sessions = await Session.find({
    $and: [
      {
        movieId: movie._id,
      },
      {
        startTime: {
          $gt: new Date().toISOString(),
        },
      },
    ],
  });

  const data = {
    movie: movie,
    sessions: sessions,
  };

  res.json(data);
});

module.exports = router;

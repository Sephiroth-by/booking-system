const router = require('express').Router();
const authMiddleware = require('../helpers/authMiddleware');
const { createSession } = require('../helpers/sessionHelpers');
const GeneralError = require('../helpers/generalError');
const Movie = require('../models/Movie');
const Session = require('../models/Session');

router.post('/', authMiddleware, async (req, res, next) => {
  const { cinemaId, movieId, startDate, endDate, price } = req.body;
  const session = await createSession(cinemaId, movieId, startDate, endDate, price);
  if (!session) {
    let error = new GeneralError('Invalid input', 400);
    return next(error);
  }
  res.json(session);
});

router.get('/:movieId', async (req, res, next) => {
  const movieId = req.params.movieId;

  if (!movieId) {
    let error = new GeneralError('Movie id missing', 400);
    return next(error);
  }

  const movie = await Movie.findOne({
    _id: movieId,
  });

  if (!movie) {
    let error = new GeneralError('No movie found', 400);
    return next(error);
  }

  const sessions = await Session.aggregate([
    {
      $match: {
        $and: [
          {
            movieId: movie._id,
          },
          {
            startTime: {
              $gt: new Date(),
            },
          },
          {
            seatsAvailable: {
              $gt: 0,
            },
          },
        ],
      },
    },
    {
      $lookup:
      {
        from: 'cinemas',
        localField: 'cinemaId',
        foreignField: '_id',
        as: 'cinema',
      },
    },
    {
      $unwind: {
        path: '$cinema',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        reservations: 0,
        cinema: {
          seats: 0,
          seatsAvailable: 0,
        },
      },
    },
  ]);

  sessions.forEach((session) => {
    session.time = session.startTime.getHours() + ':' + session.startTime.getMinutes();
    session.day = session.startTime.toLocaleDateString();
    session.duration = Math.round((session.endTime.getTime() - session.startTime.getTime())/ 60000);
  });

  const data = {
    movie: movie,
    sessions: sessions,
  };

  res.json(data);
});

module.exports = router;

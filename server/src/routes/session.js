const router = require('express').Router();
const authMiddleware = require('../helpers/authMiddleware');
const {createSession, reserveSeat, releaseSeat, expireCart} = require('../helpers/sessionHelpers');
const {updateOrder, createInitialOrder} = require('../helpers/orderHelpers');
const {sendBadRequest} = require('../helpers/responseHelpers');
const Movie = require('../models/Movie');
const Session = require('../models/Session');

router.get('/:movieId', authMiddleware, async (req, res) => {
  const movieId = req.params.movieId;

  if (!movieId) {
    return sendBadRequest(res, 'Movie id missing');
  }

  const movie = await Movie.findOne({
    _id: movieId,
  });

  if(!movie) {
    return sendBadRequest(res, 'No movie found');
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

router.post('/', authMiddleware, async (req, res) => {
  const {cinemaId, movieId, startDate, endDate, price} = req.body;
  const session = await createSession(cinemaId, movieId, startDate, endDate, price);
  if(!session) {
    return sendBadRequest(res, 'Invalid input');
  }
  res.json(session);
});

//Reserve seat
router.put('/', authMiddleware, async (req, res) => {
  const userId = req.user._id;
  let {sessionId, orderId, seats} = req.body;

  if (!orderId) {
    const order = await createInitialOrder(userId);
    orderId = order._id;
  }

  const session = await reserveSeat(sessionId, orderId, userId, seats);
  if(!session) {
    return sendBadRequest(res, 'Invalid input');
  }
  const order = await updateOrder(session.orderId, sessionId, userId, seats);
  if(!order) {
    await releaseSeat(sessionId, orderId, seats);
    res.json({
      success: false,
      order: order,
    });
  }
  else {
    setTimeout(expireCart.bind(this, orderId), 300000);
    res.json({
      success: true,
      order: order,
    });
  }
});

module.exports = router;

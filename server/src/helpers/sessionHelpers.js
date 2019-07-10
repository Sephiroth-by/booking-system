const Session = require('../models/Session');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');
const Order = require('../models/Order');

const createSession = async (cinemaId, movieId, startDate, endDate, price) => {
  const cinema = await Cinema.findOne({ '_id': cinemaId });
  const movie = await Movie.findOne({ '_id': movieId });

  if (cinema && movie) {
    const session = new Session({
      cinemaId: cinema._id,
      movieId: movie._id,
      startTime: startDate,
      endTime: endDate,
      price: price,
      seats: cinema.seats,
      seatsAvailable: cinema.seatsAvailable,
      reservations: [],
    });

    const result = await session.save();

    return result;
  }
  return null;
};

const reserveSeat = async (sessionId, orderId, userId, seats) => {
  //ex. seats = [[1, 5], [1, 6]];
  let seatsQuery = [];
  let setSeatsSelection = {};

  const session = await Session.findOne({ '_id': sessionId });
  const order = await Order.findOne({ '_id': orderId });

  if (session && order && order.userId.equals(userId)) {
    for (let i = 0; i < seats.length; i++) {
      let seatSelector = {};
      let seatSelection = 'seats.' + seats[i][0] + '.' + seats[i][1];
      // Part of $and query to check if seat is free
      seatSelector[seatSelection] = 0;
      seatsQuery.push(seatSelector);
      // Part of $set operation to set seat as occupied
      setSeatsSelection[seatSelection] = 1;
    }

    const result = await Session.updateOne({
      _id: sessionId,
      $and: seatsQuery,
    }, {
      $set: setSeatsSelection,
      $inc: { seatsAvailable: -seats.length },
      $push: {
        reservations: {
          orderId: order._id,
          seats: seats,
          price: session.price,
          total: session.price * seats.length,
        },
      },
    });

    if (result.nModified === 0) {
      console.log('Failed to reserve seats');
      return null;
    }

    if (result.nModified === 1) {
      console.log('Reservation was successful');
      result.orderId = order._id;
      return result;
    }
  }
  return null;
};

const releaseSeat = async (sessionId, orderId, seats) => {
  //ex. seats = [[1, 5], [1, 6]];
  let setSeatsSelection = {};

  for(let i = 0; i < seats.length; i++) {
    setSeatsSelection['seats.' + seats[i][0] + '.' + seats[i][1]] = 0;
  }

  let result = await Session.updateOne({
    _id: sessionId,
  }, {
    $set: setSeatsSelection,
    $pull: { reservations: { orderId: orderId } },
  });

  if(result.nModified === 0) {
    console.log('Failed to release reservation');
  }

  if(result.nModified === 1) {
    console.log('Succeded in releasing reservation');
  }
};

const removeUserReservation = async (orderId) => {
  const result = await Session.updateMany({
    'reservations.orderId': orderId,
  }, {
    $pull: { reservations: { orderId: orderId } },
  });
  return result;
};

const expireCart = async (orderId) => {
  const order = await Order.findOne({'_id': orderId});
  if(order.state !== 'SUBMITTED') {
    for(let i = 0; i < order.reservations.length; i++) {
      let reservation = order.reservations[i];
      let seats = reservation.seats;
      let setSeatsSelection = {};

      for(let i = 0; i < seats.length; i++) {
        setSeatsSelection['seats.' + seats[i][0] + '.' + seats[i][1]] = 0;
      }

      // Release seats and remove reservation
      // eslint-disable-next-line no-await-in-loop
      await Session.updateOne({
        _id: reservation.sessionId,
      },
      {
        $set: setSeatsSelection,
        $inc: { seatsAvailable: seats.length },
        $pull: { reservations: { orderId: order._id }},
      });
    }

    order.state = 'EXPIRED';

    await order.save();
  }
};

module.exports = {
  createSession,
  reserveSeat,
  releaseSeat,
  removeUserReservation,
  expireCart,
};

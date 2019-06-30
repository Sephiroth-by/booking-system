const Session = require('../models/Session');
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');
const User = require('../models/User');

const createSession = async (cinemaId, movieId, startDate, endDate, price) => {
  const cinema = await Cinema.findOne({ '_id': cinemaId });
  const movie = await Movie.findOne({ '_id': movieId });

  if (cinema && movie) {
    const session = new Session({
      cinemaId: cinema._id,
      movieId: movie._id,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      price: price,
      seats: cinema.seats,
      seatsAvailable: cinema.seatsAvailable,
      reservations: [],
    });

    await session.save();
  }
};

const reserveSeat = async (sessionId, userId, seats) => {
  //ex. seats = [[1, 5], [1, 6]];
  let seatsQuery = [];
  let setSeatsSelection = {};

  const session = await Session.findOne({ '_id': sessionId });
  const user = await User.findOne({ '_id': userId });

  if (session && user) {
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
          userId: userId,
          seats: seats,
          price: session.price,
          total: session.price * seats.length,
        },
      },
    });

    if (result.nModified === 0) {
      console.log('Failed to reserve seats');
    }

    if (result.nModified === 1) {
      console.log('Reservation was successful');
    }
  }
};

const releaseSeat = async (sessionId, userId, seats) => {
  //ex. seats = [[1, 5], [1, 6]];
  let setSeatsSelection = {};

  for(let i = 0; i < seats.length; i++) {
    setSeatsSelection['seats.' + seats[i][0] + '.' + seats[i][1]] = 0;
  }

  const session = await Session.findOne({'_id': sessionId});
  const user = await User.findOne({'_id': userId});

  if(session && user) {
    let result = await session.updateOne({
      _id: sessionId,
    }, {
      $set: setSeatsSelection,
      $pull: { reservations: { _id: userId } },
    });

    if(result.nModified === 0) {
      console.log('Failed to release reservation');
    }

    if(result.nModified === 1) {
      console.log('Succeded in releasing reservation');
    }
  }
};

const removeUserReservation = async (userId, sessionId) => {
  const session = await Session.findOne({'_id': sessionId});
  const user = await User.findOne({'_id': userId});

  if(user && session) {
    await session.updateOne({
      $and: [{
        '_id': sessionId,
      },
      {
        'reservations.userId': userId,
      },
      ],
    }, {
      $pull: { reservations: { userId: userId } },
    }, false, true);
  }
};

module.exports = {
  createSession,
  reserveSeat,
  releaseSeat,
  removeUserReservation,
};

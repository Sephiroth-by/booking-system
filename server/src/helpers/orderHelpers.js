const Session = require('../models/Session');
const Order = require('../models/Order');

const createInitialOrderOrGetCurrent = async (userId) => {
  let order = await Order.findOne({
    $and: [
      {
        userId: userId,
      },
      {
        state: 'UPDATED',
      },
    ],
  });
  if (order) {
    return order;
  }
  order = new Order({
    userId: userId,
    state: 'INITIAL',
    total: 0,
    createdDate: new Date().toISOString(),
  });

  await order.save();

  return order;
};

const updateOrder = async (orderId, sessionId, userId, seats) => {
  //ex. seats = [[1, 5], [1, 6]];

  const session = await Session.findOne({ '_id': sessionId });
  const order = await Order.findOne({ '_id': orderId });

  if (session && order && order.userId.equals(userId)) {
    order.sessionId = sessionId,
    order.seats = seats,
    order.price = session.price,
    order.total = session.price * seats.length,
    order.modifiedOn = new Date().toISOString();
    order.state = 'UPDATED';

    await order.save();
    return order;
  }
  return null;
};

const submitOrder = async (orderId) => {
  const order = await Order.findOne({ '_id': orderId });
  if (order && order.state === 'UPDATED') {
    order.state = 'SUBMITTED';
    await order.save();

    return order;
  }
  return null;
};

const getOrders = async (userId) => {
  let orders = await Order.find({userId: userId,
    state: 'SUBMITTED'}).lean();

  if (!orders.length) {
    return [];
  }

  const sessionIds = orders.map((o) => o.sessionId);

  const sessions = await Session.aggregate([
    {
      $match: {
        _id: {
          $in: sessionIds,
        },
      },
    },
    {
      $lookup: {
        from: 'cinemas',
        localField: 'cinemaId',
        foreignField: '_id',
        as: 'cinema',
      },
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'movieId',
        foreignField: '_id',
        as: 'movie',
      },
    },
    {
      $unwind: {
        path: '$cinema',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: '$movie',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        seats: 0,
        seatsAvailable: 0,
        reservations: 0,
        cinema: {
          seats: 0,
          seatsAvailable: 0,
        },
        movie: {
          description: 0,
        },
      },
    },
  ]);

  for (let i=0; i<orders.length; i++) {
    orders[i].session = sessions.find((s) => s._id.equals(orders[i].sessionId));
  }

  return orders;
};

module.exports = {
  updateOrder,
  submitOrder,
  createInitialOrderOrGetCurrent,
  getOrders,
};

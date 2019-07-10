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
  if(order) {
    return order;
  }
  order = new Order({
    userId: userId,
    state: 'INITIAL',
    total: 0,
    reservations: [],
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
    order.reservations.push({
      sessionId: sessionId,
      seats: seats,
      price: session.price,
      total: session.price * seats.length,
    });
    order.total += session.price * seats.length;
    order.modifiedOn = new Date().toISOString();
    order.state = 'UPDATED';

    await order.save();
    return order;
  }
  return null;
};

const submitOrder = async (orderId) => {
  const order = await Order.findOne({ '_id': orderId });
  if(order && order.state === 'UPDATED') {
    order.state = 'SUBMITTED';
    await order.save();

    return order;
  }
  return null;
};

module.exports = {
  updateOrder,
  submitOrder,
  createInitialOrderOrGetCurrent,
};

const Session = require('../models/Session');
const User = require('../models/User');
const Order = require('../models/Order');

const updateOrder = async (orderId, sessionId, userId, seats) => {
  //ex. seats = [[1, 5], [1, 6]];

  const session = await Session.findOne({ '_id': sessionId });
  const order = await Order.findOne({ '_id': orderId });
  const user = await User.findOne({ '_id': userId });

  if (user && session) {
    if(!order) {
      let order = new Order({
        userId: userId,
        state: 'INITIAL',
        total: 0,
        reservations: [],
        createdDate: new Date().toISOString(),
      });

      await order.save();
    }

    const result = await order.updateOne({
      _id: orderId,
    }, {
      $push: {
        reservations: {
          sessionId: sessionId,
          seats: seats,
          price: session.price,
          total: session.price * seats.length,
        },
      },
      $inc: { total: session.price * seats.length },
      $set: { modifiedOn: new Date() },
    });

    if(result.nModified === 0) {
      console.log('Failed to add reservation to cart');
    }

    if(result.nModified === 1) {
      console.log('Successfully added reservation to cart');
    }
  }
};

const submitOrder = async (orderId) => {
  const order = await Order.findOne({'_id': orderId});

  if(order) {
    await order.updateOne({
      _id: orderId,
    }, {
      $set: { state: 'SUBMITTED' },
    });
  }
};

module.exports = {
  updateOrder,
  submitOrder,
};

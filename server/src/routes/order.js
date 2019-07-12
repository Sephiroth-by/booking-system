const router = require('express').Router();
const authMiddleware = require('../helpers/authMiddleware');
const {removeUserReservation} = require('../helpers/sessionHelpers');
const {reserveSeat, releaseSeat, expireCart} = require('../helpers/sessionHelpers');
const {updateOrder, createInitialOrderOrGetCurrent} = require('../helpers/orderHelpers');
const {submitOrder, getOrders} = require('../helpers/orderHelpers');
const GeneralError = require('../helpers/generalError');

//Reserve seat
router.put('/', authMiddleware, async (req, res, next) => {
  const userId = req.user._id;
  let {sessionId, orderId, seats} = req.body;

  if (!orderId) {
    const order = await createInitialOrderOrGetCurrent(userId);
    orderId = order._id;
  }

  const session = await reserveSeat(sessionId, orderId, userId, seats);
  if(!session) {
    let error = new GeneralError('Invalid input', 400);
    return next(error);
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
    setTimeout(expireCart.bind(this, orderId), 30000);
    res.json({
      success: true,
      order: order,
    });
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  const {orderId} = req.body;

  const session = await removeUserReservation(orderId);
  if(!session) {
    let error = new GeneralError('Invalid input', 400);
    return next(error);
  }
  const order = await submitOrder(orderId);
  if (!order) {
    let error = new GeneralError('Invalid input', 400);
    return next(error);
  }
  res.json(order);
});

router.get('/', authMiddleware, async (req, res, next) => {
  const orderType = req.query.type;
  let orders = await getOrders(req.user._id);

  if(orderType === 'past') {
    orders = orders.filter((o) => o.session.startTime <= new Date());
  }
  else if(orderType === 'future') {
    orders = orders.filter((o) => o.session.startTime >= new Date());
  }
  res.json(orders);
});

module.exports = router;

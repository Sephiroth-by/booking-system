const router = require('express').Router();
const authMiddleware = require('../helpers/authMiddleware');
const {removeUserReservation} = require('../helpers/sessionHelpers');
const {submitOrder} = require('../helpers/orderHelpers');
const {sendBadRequest} = require('../helpers/responseHelpers');

router.post('/', authMiddleware, async (req, res) => {
  const {orderId} = req.body;

  const session = await removeUserReservation(orderId);
  if(!session) {
    return sendBadRequest(res, 'Invalid input');
  }
  const order = await submitOrder(orderId);
  if (!order) {
    return sendBadRequest(res, 'Invalid input');
  }
  res.json(order);
});

module.exports = router;

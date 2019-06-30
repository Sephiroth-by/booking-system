const router = require('express').Router();
const Order = require('../models/Order');
const authMiddleware = require('../helpers/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const user = req.user;

  const {} = req.body;
  const order = new Order({

  });

  res.json(order);
});

module.exports = router;

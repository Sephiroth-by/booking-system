const router = require('express').Router();
const User = require('../models/User');
const {sendBadRequest} = require('../helpers/responseHelpers');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendBadRequest(res, 'Email and Password mandatory');
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return sendBadRequest(res, 'User already exists');
  }

  const user = new User({
    email: email,
  });

  user.setPassword(password);
  await user.save();

  res.json(user.toAuthJSON());
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendBadRequest(res, 'Email and Password mandatory');
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return sendBadRequest(res, 'No user found');
  }

  if(!user.validatePassword(password)) {
    return sendBadRequest(res, 'Wrong password');
  }

  res.json(user.toAuthJSON());
});

module.exports = router;

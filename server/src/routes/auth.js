const router = require('express').Router();
const User = require('../models/User');
const GeneralError = require('../helpers/generalError');
const authMiddleware = require('../helpers/authMiddleware');

router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let error = new GeneralError('Email and Password mandatory', 400);
    return next(error);
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    let error = new GeneralError('User already exists', 400);
    return next(error);
  }

  const user = new User({
    email: email,
  });

  user.setPassword(password);
  await user.save();

  res.json(user.toAuthJSON());
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let error = new GeneralError('Email and Password mandatory', 400);
    return next(error);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    let error = new GeneralError('No user found', 400);
    return next(error);
  }

  if(!user.validatePassword(password)) {
    let error = new GeneralError('Wrong password', 400);
    return next(error);
  }

  res.json(user.toAuthJSON());
});

router.get('/', authMiddleware, async (req, res, next) => {
  const user = req.user;

  res.json(user.toAuthJSON());
});

module.exports = router;

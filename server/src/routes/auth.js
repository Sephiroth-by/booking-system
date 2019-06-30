const router = require('express').Router();
const User = require('../models/User');
const authRequired = require('../helpers/authMiddleware');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and Password mandatory'
    });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({
      error: 'User already exists'
    });
  }

  const user = new User({
    email: email
  });

  user.setPassword(password);
  await user.save();

  res.json(user.toAuthJSON());
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and Password mandatory'
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).json({
      error: 'No user found'
    });
  }

  if(!user.validatePassword(password)) {
    res.status(400).json({
      error: 'Wrong password'
    });
  }

  res.json(user.toAuthJSON());
});

router.get('/test', authRequired, (req, res) => {
  res.json({
    status: 'success'
  });
});

module.exports = router;

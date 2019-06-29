const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserFromAuthHeader = (req) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token.startsWith('Bearer ')) {
    return null;
  }
  token = token.slice(7, token.length);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = User.find({ email: decodedToken.email });
  return user;
};

const authRequired = (req, res, next) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    res.status(403).json({
      error: 'Authentication required'
    });
  }
  req.user = user;
  next();
}

module.exports = authRequired;

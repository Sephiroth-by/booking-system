const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GeneralError = require('../helpers/generalError');

const getUserFromAuthHeader = async (req) => {
  let token = req.headers['authorization'];
  if (!token || !token.split(' ')[0] === 'Bearer') {
    return null;
  }
  token = token.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findOne({ email: decodedToken.email });
  return user;
};

const authRequired = async (req, res, next) => {
  const user = await getUserFromAuthHeader(req);
  if (!user) {
    let error = new GeneralError('Authentication required', 403);
    return next(error);
  }
  req.user = user;
  return next();
};

module.exports = authRequired;

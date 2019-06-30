const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const hashPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

const UserSchema = new Schema({
  email: String,
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = hashPassword(password, this.salt);
}

UserSchema.methods.validatePassword = function (password) {
  const hash = hashPassword(password, this.salt);
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function () {
  return jwt.sign({
    id: this._id,
    email: this.email,
  }, process.env.JWT_SECRET_KEY,
    { expiresIn: '24h' }
  );
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UserSchema);

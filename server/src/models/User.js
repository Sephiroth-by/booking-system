const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('crypto');

const hashPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = hashPassword(password, this.salt);
}

UserSchema.methods.checkPassword = function(password){
  var hash = hashPassword(password, this.salt);
  this.hash === hash;
}

module.exports = mongoose.model('User', UserSchema);

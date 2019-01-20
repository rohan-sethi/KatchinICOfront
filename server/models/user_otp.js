const mongoose = require('mongoose');
const User = require('./User');

const userOtpSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  otp: {type: String},
  otpType: {type: String},
  sendAt: {type: Date},
  expire: {type: Date}
})

module.exports = mongoose.model('UserOtp', userOtpSchema);
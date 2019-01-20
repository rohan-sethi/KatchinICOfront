const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {type: String, unique: true, required: true},
    activateUrl: String,
    username: String,
    password: String,
    type: String,
    addressHistory: [{ address: String, updatedAt: Date }],
    address: { current: String, default: String },
    salt: { type: String },
    twoFactor: { type: Boolean, default: false },
    oauthUrl: { type: String },
    keys:[{index: Number, key: String, value: String}],
    status:String
  }
);
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema)
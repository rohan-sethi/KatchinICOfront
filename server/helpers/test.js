const mongoose = require("mongoose");
const UserOtp = require('../models/user_otp');
const User = require('../models/User');
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/digiico";

try {
  mongoose.connect(url, {
    //useMongoClient: true
  })
} catch (error) {

}

function getUserOtp(){
  User.findOne({email: "manishrai9718@gmail.com"})
    .then(user => {
      console.log(user);
      UserOtp.findOne({ userId: user._id, otpType: "2fa"}).sort({ field: 'asc', _id: -1 })
        .then(result => {
          console.log(Date.now());
          console.log(Date.now() - Number(result.sendAt));
        })
    })
    .catch(error => {
      console.log("error occured: "+ error);
    })
}

getUserOtp();
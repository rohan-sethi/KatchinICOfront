const mongoose = require('mongoose')

let SettingSchema = new mongoose.Schema(
  {
    key: String,
    value: String
  }
)

module.exports = mongoose.model("Setting", SettingSchema);
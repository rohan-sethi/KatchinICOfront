const mongoose = require('mongoose');
const Order = require('./Order');


const balancesSchema = mongoose.Schema({
  // add user id here to find all the balances of particular user
  orderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
  amount: { type: Number },
  address: { type: String },
  transactionType: { type: String },
  status: { type: String },
  tx_id: { type: String }
});

module.exports = mongoose.model('Balances', balancesSchema);


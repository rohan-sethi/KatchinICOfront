const mongoose = require('mongoose')
let OrderSchema = new mongoose.Schema(
    {
        orderid: String,
		planid: String,
		userid: String,
		plan_name: String,
        txid:String,
        tx_address:String,
        amount:Number,
        tx_coin_type:String,
        step:String,
        coins:String,      
        created_date: Date,
		status:String,
		status_text:String,
		site_status:String,
		ip_address:String,
        user_have_coin:String,
		user_coins:String,
        coinPayTranCreateReq:[],
        coinPayPaymentReceiveReq:[],
        swapShiftRequest:[],
        swapTxStatReq:[],

    }
	
	
);

module.exports = mongoose.model('Order', OrderSchema);
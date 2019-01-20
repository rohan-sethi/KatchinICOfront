const mongoose = require('mongoose')

let WalletSchema = new mongoose.Schema(
    {
        index: Number,
        address: String,
        id: String,
		userId:String,	
        
    }
)

module.exports = mongoose.model('Wallet', WalletSchema)
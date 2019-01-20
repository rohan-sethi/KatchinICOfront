/** */
const Plan = require('./../models/Plan')
const fs = require('fs')
const cloudinary = require('cloudinary')
console.log('plan call');
const Coinpayments = require("coinpayments")

var client = new Coinpayments({
    key: "3a91fc59650ecf96516eb86f198566717aea7d67bf6527df8c9972182a96a78f",
    secret: "49C0938D23542Fd017F085F8318A381C0637Fcd162FefC8c1A71a69D98dD37D5"
});


module.exports = {
    getAll: (req, res, next) => {
    
	console.log('trainsation::::::::::::::::::::::::::::::::');
	console.log(req);
    	
	client.createTransaction({'currency1' : 'USD', 'currency2' : req.coinType, 'amount' : req.amountPay},function(err,result){
 		
  		 if(err){
  		 	res.status(500).send({
					message: err.message || "Some error occurred while retrieving notes."
				});
  		 }  		
  		 res.send(result)
  		 
	    /*	
			Plan.find()
			.then(plans => {		
			res.send(plans);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occurred while retrieving notes."
				});
			});
		*/
		});
    },
   
    
}
/** */
const fs = require('fs')
const cloudinary = require('cloudinary')
const Coinpayments = require("coinpayments")
const Order = require('./../models/Order')
var cron = require('node-cron');
var async = require('async');

var client = new Coinpayments({
    key: "f90c38691a20dbe9f6d84c4625df21a5568a53164c0cce9cfc09a44ddd890913",
    secret: "66930A57f3C5f621B977F56b42C20Dc7C4273f96F54C91747cD1c7458277db18"
});



module.exports = {
	
    addAll: (req, res, next) => {    	    	
	//client.createTransaction({'currency1' : 'USD', 'currency2' : req.coinType, 'amount' : req.amountPay},function(err,result){
 	var amount_usd =parseInt(req.body.amountPay); 	
 	client.createTransaction({'currency1' : 'USD', 'currency2' :String(req.body.coinType), 'amount' :amount_usd },function(err,result){ 
			
  		 if(err){
  		 	res.status(500).send({
					message: err.message || "Some error occurred while retrieving notes."+amount_usd+''+req.body.coinType+' ' +err
				});
  		 }  		
		 
		if(result){
		
		var orderDataInsert={}; 			
		orderDataInsert.coinPayTranCreateReq  = (result)? JSON.stringify(result):[];
		 var arrayReqCreate=[]; 
		 arrayReqCreate.push(JSON.stringify(result));	
		orderDataInsert.coinPayTranCreateReq=arrayReqCreate;		
		orderDataInsert.orderid  = (req.body.orderId)? req.body.orderId:'';
		orderDataInsert.tx_address  = (result.txn_id)? result.txn_id:'';
		orderDataInsert.txid  = (result.address)? result.address:'';
		Order.findOneAndUpdate({orderid:req.body.orderId},{$set: orderDataInsert}, {upsert : false}).then((err, resultArr)=> {	
			console.log('coinPayTranCreateReq')
			if(err) { //return console.log(err);				
				//res.send(err);
				console.log(err)

			} 					
			
		});
		res.send(result)
		
		}  
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
	transactionStatus: (req, res, next) => {    	    	
	//client.createTransaction({'currency1' : 'USD', 'currency2' : req.coinType, 'amount' : req.amountPay},function(err,result){
 		console.log(req.params.id)
 		console.log(req.body.coinPayTranCreateReq)
		//let txn_id_array = [ 'CPCG2BDGZJOYMIR0SR4GCY8X0V'];
		client.getTx(req.params.id,function(err,resultStatus,callback){
			//return res.send(resultStatus);
			// payment completed
			
				if(err){
					res.status(500).send({
						message: err.message || "Some error occurred while retrieving notes."+err
					});
				}
			
				if(resultStatus){
					
					var orderData={}; 
					orderData.send_address =   (resultStatus.send_address)? resultStatus.send_address:'';  
					orderData.send_txid  =   (resultStatus.send_txid)? resultStatus.send_txid:''; 
					orderData.status  =   (resultStatus.status)? resultStatus.status:''; 
					orderData.tx_coin_type  =   (resultStatus.coin)? resultStatus.coin:'';
					
					if(resultStatus.status==0){
						orderData.status_text = 'Waiting' ;
					}					
					if(resultStatus.status==1){
						orderData.status_text = 'Pending' ;
					}					
					if(resultStatus.status==2){
						orderData.status_text = 'Complete' ;
					}
					if(resultStatus.status==-1){
						orderData.status_text = 'Cancelled' ;
					}
					
					
					//orderData.status_text  =   (resultStatus.status_text)? resultStatus.status_text:'';					
					orderData.user_coins  =   (resultStatus.amountf)? resultStatus.amountf:'';					
					orderData.tx_address  =   (req.params.id)? req.params.id:'';				
					 var arrayReq=[];
					arrayReq.push(JSON.stringify(resultStatus));	
					orderData.coinPayPaymentReceiveReq= arrayReq;					
					//orderData.created_date =   myDate;  
					//console.log(orderData)
					Order.findOneAndUpdate({tx_address:req.params.id},{$set: orderData}, {upsert : false}).then((resultArr,err )=> {	
							console.log('coinPayPaymentReceiveReq')
						if(err) { //return console.log(err);				
							res.send(err);
						} 					
						
					});
					res.send(resultStatus)
					
				}		
					  	  		
				
		});
    },
	
	transactionDetails: (req, res, next) => {    	    	
	
 		console.log(req.params.id)	

		Order.findById(req.params.id)
		.then(order => {
			if (!order) {
				return res.status(200).json(
					{
						message:"order not found ",
						success:false
					});
				
			}else{
                
               res.status(200).json({success: true, message: order})
			}
			
		}).catch(error =>{
			res.status(200).json({success: false, message: "Error occured: "+ error})
		});
		
	
    }
      
    
}


function updateCurrentStatus(){
	
			var orderArr=[]	
			var responseArr={}	
			Order.find({'status_text': {$in:['Waiting','Pending']}}).then(orderRes => {	
					//console.log(orderRes)
					if(orderRes.length > 0 ){
						
						async.forEach(orderRes, function (item, callback){ 
							orderArr.push(item.tx_address);
							// tell async that that particular element of the iterator is done
							callback(); 
						}, function(err) {
								console.log('iterating done');
						});
						
					}					
					
			}).then(result =>{
					
					responseArr.orderListToUpdate = orderArr;
					return new Promise(async function (resolve, reject) {
						await client.getTxMulti(orderArr, function (err, response) {						
							//console.log(response)
							resolve(response);
							//return orderRes
						})
					});			
								
				console.log('plan details: second ')
					
			}).then(result =>{
				
				console.log('plan details: third ')
				//console.log(result)
					var statusSet='';
					async.forEach(result, function(order, callback){
						
							 if(order.status==0){
								  statusSet ='Waiting';
							 }
							 
							 if(order.status==2){
								  statusSet ='Complete';
							 }
							 if(order.status==-1){
								  statusSet ='Cancelled';
							 }
							 
							  if(order.status==1){
								  statusSet ='Pending';
							 }
							 
							 Order.updateOne({ txid: order.payment_address }, {
								  $set: {
									status: order.status,
									status_text:statusSet
								  }
								}
								).then(result => {
									
									callback(); 
								  if (result.n > 0) {
									console.log(
									  "record updated succesfully: " +
									  JSON.stringify(result)
									);
									responseArr.updateStatus='record updated';
								  } else {
									  callback(); 
									// mailer to notify that trabsaction was sent but could not be updated due to mongodb error
									console.log("no record updated");
									responseArr.updateStatus='no record updated';
								  }
							 });
							
						
							

						}, function(err) {
							console.log('final done');
					});  
				 
				 
				 
				 //res.status(200).json({success: true, message: orderArr})
			}).then(result =>{
				console.log('con job job done');
			//	res.status(200).json({success: true, message: responseArr})
			});
	
	
	
	
}


cron.schedule('*/5 * * * *', function () {
  console.log('exec transaction job');
  
   updateCurrentStatus();
  
}).start();
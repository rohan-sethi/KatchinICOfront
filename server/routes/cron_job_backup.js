const cronjobController = require('./../controllers/cron_job.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
const Plan = require('./../models/Plan')
const User = require('./../models/User')
const Order = require('./../models/Order')
var cron = require('node-cron');
var async = require('async');
var Coinpayments = require('coinpayments');
const client = new Coinpayments({
  key: 'f90c38691a20dbe9f6d84c4625df21a5568a53164c0cce9cfc09a44ddd890913',
  secret: '66930A57f3C5f621B977F56b42C20Dc7C4273f96F54C91747cD1c7458277db18'
});

module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/cron_job')
        .get(cronjobController.getAll)
	
   
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


/** */
const Plan = require('./../models/Plan')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')
const Order = require('./../models/Order')
const jwt = require('jsonwebtoken');
var crypto = require('crypto')


module.exports = {
    getAll: (req, res, next) => {
		 Plan.find()
		.then(plans => {		
		res.send(plans);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving notes."
			});
		});
    },
   
    /**
     * article_id
     */
		getPlan: (req, res, next) => {			
			
					let dataArr={};	
					 // get userid and orderid 
					const token = req.headers.authorization.split(" ")[1];
					const decodedToken = jwt.verify(token, 'secret_should_long_enough');		
					let orderSet='';
					dataArr.userSet = decodedToken.userId;
					var current_date = (new Date()).valueOf().toString();
					var random = Math.random().toString();
					var infoIn =crypto.createHash('sha1').update(current_date + random).digest('hex');
					
					Order.find({userid:decodedToken.userId,site_status:'incomplete'}).limit(1).then(orderRes => {	
							//console.log(orderRes)
							if(orderRes.length == 0){
								dataArr.orderIdSet= infoIn;	
							}else{	
								console.log('plan details id: '+orderRes[0].orderid)	
								 dataArr.orderIdSet= orderRes[0].orderid;	
								
							}
					}).then(result =>{	
					
							console.log('plan details: second ')	
							return Plan.findById(req.params.id).then(plans => {								
								plans= JSON.stringify(plans);
								plans= JSON.parse(plans);					
								dataArr.plans = plans;
								plans.orderData=req.body;
								dataArr.orderData=req.body;
								var newOrder=req.body;
								return dataArr.orderIdOld = dataArr.orderIdSet;	

							});	

					}).then(result =>{	
				
					
					 var orderData={}; 
					 var newOrder=req.body;
					orderData.orderid =   dataArr.orderIdSet; 
					//console.log('orderid:'+dataArr.orderIdSet)	
					orderData.userid  =   (dataArr.userSet)? dataArr.userSet:''; 
					orderData.planid  =   (newOrder.setPlanId)? newOrder.setPlanId:''; 
					orderData.coins  =   (newOrder.coinCount)? newOrder.coinCount:'';
					orderData.amount = (newOrder.amountPay)? newOrder.amountPay:'';		 
					orderData.txid  = (newOrder.transactionAddress)? newOrder.transactionAddress:'';
					orderData.tx_address  = (newOrder.transactionId)? newOrder.transactionId:'';
					orderData.tx_coin_type  = (newOrder.coinType)? newOrder.coinType:'';
					orderData.step  = (newOrder.step)? newOrder.step:'';
					orderData.status  = (newOrder.status)? newOrder.status:'incomplete';
					orderData.status_text  = (newOrder.status_text)? newOrder.status_text:'incomplete';
					console.log('status_text:'+newOrder.status_text)
					if(newOrder.status_text=='incomplete' || newOrder.status_text== undefined ){
						console.log('incomplete1')
						orderData.site_status  = 'incomplete';				
					}else{
						console.log('done2')
						orderData.site_status  ='done';
					}			
					
					orderData.created_date  = (newOrder.created_date)? newOrder.created_date:'';
					orderData.ip_address  = (newOrder.setIPAdd)? newOrder.setIPAdd:'';
					orderData.user_have_coin  = (newOrder.user_have_coin)? newOrder.user_have_coin:'';
					orderData.plan_name  = (dataArr.plans.name)? dataArr.plans.name:'';		
					//resultArr.orderData= orderData;	
							
					 Order.findOneAndUpdate({orderid:dataArr.orderIdSet,userid:dataArr.userSet},{$set: orderData}, {upsert : true}).then((user,err)=> {	
							if(err){						
								//res.send({	message: err.message || "Some error occurred update order."	});
							}else { 
								//console.log('444')
								//return res.send(resultArr);
							}
							
					   }).then(result =>{					

							return res.send(dataArr);
						
						});
		
				});
	
		   
		       
       
    }
	
	/*addPlan: (req, res, next) => {		
		var data={ name:'sunil' };
		new Plan(data).save((err, article) => {
			if (err)
				res.send(err)
			else if (!article)
				res.send(400)
			else {			  
				return res.send(article)			  
			}
			next()
		})		
	 }
	*/
	
}
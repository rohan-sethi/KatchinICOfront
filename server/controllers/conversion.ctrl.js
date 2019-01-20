/** */
const Plan = require('./../models/Plan')
const User = require('./../models/User')
const Order = require('./../models/Order')

const fs = require('fs')
const cloudinary = require('cloudinary')
var crypto = require('crypto')
const	async = require('async')
var allData = [];	
const localIpUrl = require('local-ip-url');
const jwt = require('jsonwebtoken');

module.exports = {
   
   getAll_bk:(req,res,next)=>{ 

   		// first 
   			Plan.findOne().then(plans => {	
				allData.push(plans);		
				console.log('assigne plans');
				 next();	
			}).catch(err => {			
				console.log(err);
				 next();
			});

   		// second

   			User.findOne().then(user => {	
   				allData.push(user);		
				res.send(allData);
				console.log('assigne user');		
			 	next();
			//res.send(plans);
			}).catch(err => {			
				 next();
			});
			

	},
    getAll: (req, res, next) => {
					
				var current_date = (new Date()).valueOf().toString();
				var random = Math.random().toString();
				var infoIn =crypto.createHash('sha1').update(current_date + random).digest('hex'); 
				var dataSend={loginId:localIpUrl()} 				
				res.send(dataSend)
	
    }
 
    
}
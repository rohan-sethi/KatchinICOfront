/** */
const User = require('./../models/User')
const Article = require('./../models/Article')
const Wallet = require('./../models/Wallet')
const Order = require('./../models/Order')
const speakeasy = require('speakeasy');
const Setting = require('../models/setting');
const bcrypt = require('bcrypt');
const Fawn = require("fawn");
const Constant = require('../contants');
const RandomHelper = require('../helpers/two_fa_key_gen');
const Plan = require('../models/Plan');
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const UserOtp = require('../models/user_otp');
const Balances = require('../models/balances');
var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var async = require('async');
var transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true, // use SSL
  auth: {
    user: 'mailer@digibit.org',
    pass: 'GaQ-2pU-4XE-yQF'
  }
});


// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});


var userFun =module.exports = {


	  getValid: (req, res, next) => {
       res.send({success:true}) 
    },

    doLogin: (req, res, next) => {
        console.log('calll');
        User.find({email:req.body.username,password:req.body.password}).then((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()            
        })
    },
    addUser: (req, res, next) => {
        
        var newUser=req.body;
       
         new User(newUser).save((err, userAdd) => {
             
            if (err){
                res.send(err)
            }else if (!userAdd){
                 res.send(400)
            } else{
                console.log(userAdd._id)
                userFun.assignKey(userAdd._id)
                res.send(userAdd)                
                next()
            }

        });
        
        
    },
    checkUser: (req, res, next) => {
        User.find({email:req.body.email}).then
        /*populate('following').exec*/((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()            
        })
    },
    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({msg: "followed"})
            })
        }).catch(next)
    },
    getUserProfile2: (req, res, next) => {
        User.findById(req.params.id).then
        ((user) => {      
			var setSize = {}
			 setSize.limit =1
   			 return Order.find({'status_text':'Complete','userid':req.params.id},{},setSize).then((ordersArr)=>{
				 
				 response = {"error" : true,"users" :user,"userPlan":ordersArr};
				return res.json(response)
				//res.send(user)
			}).catch((err)=>console.log(err))	
          
        }).catch((err)=>console.log(err))
    },
	
	getUserProfile: (req, res, next) => {
		var total_coin=0;
        User.findById(req.params.id).then
        ((user) => {      
			
   			 Order.find({'status_text':'BlockChain','userid':req.params.id}).then((ordersArr)=>{

						async.forEachOf(ordersArr, function (value,key, callback){
								if(value){
								  Balances.find({orderId:value._id,status:'success'}).then
									((balancesData) => {
										if(balancesData.length > 0){
											total_coin += parseFloat(balancesData[0].amount)											
										}													
										callback(); 
									});
								}

						}, function(err) {
							console.log('iterating done');					
							response = {"error" : true,"users" :user,"userPlan":ordersArr,'total_coins':parseFloat(total_coin)};
							return res.json(response)
						});

										 
				//res.send(user)
			}).catch((err)=>console.log(err))	
          
        }).catch((err)=>console.log(err))
    },

	getUserOrders: (req, res, next) => {
        User.findById(req.body._id).then
        ((_user) => {	

			var pageNo = parseInt(req.body.pageNo)
			var size = 5
			var query = {}
			if(pageNo < 0 || pageNo === 0) {
			response = {"error" : true,"message" : "invalid page number, should start with 1"};
			return res.json(response)
			}
			query.skip = size * (pageNo - 1)
			query.limit = size

			 Order.find({'userid': req.body._id}).then((ordersArr)=>{			
					//res.send(orders) 

				return Order.find({'userid':req.body._id} ,{},query,function(err,orders) {					

						if(err) {
						response = {"error" : true,"message" : "Error fetching data"};
						} else {
							var totalPages = Math.ceil(ordersArr.length / size)
							response = {"error" : false,"message" : orders,"pages": totalPages,"totalCount": ordersArr.length};					
						}			
						
						//res.send(orders)     
						res.json(response);	
				})
				 
            })
			
            
        }).catch((err)=>console.log(err))
    },
	
     assignKey: (get_user_id) => {

        // first check userid in user_data 

        // if exits leave it

        // if not assigne in user data and update in user_data

            var userid = get_user_id;            
            Wallet.find({userId:get_user_id}).then((getwallet) => {
                 
                if(getwallet.length==0){

                Wallet.find({"address": {$ne:'0xF30ADc4569cA10d6D5832114baFa4DB3A4444801'},userId:{$exists:false}}).limit(1).then((allList)=>{
                 
                    //update this users
                    var setAddress = allList[0].address;
                    User.update({ _id: userid }, { $set: { address: { current: allList.address, default: allList.address}}}).then((resUser)=>{
                        // Update in wallet                        
                        Wallet.update({'address':setAddress},{"userId":userid},{upsert:false,
                          multi:true}).then((updateWallet)=>{

                             res.send(allList)

                          }).catch((err)=>console.log(err));



                    }).catch((err)=>console.log(err));



                 }).catch((err)=>console.log(err))   

                }else{
                     res.send(getwallet);
                }

            }).catch((err)=>console.log(err))
    },

    authenticateCredential: (req, res, next) => {
        let fetchedUser;
        let token;
        User.findOne({ email: req.body.email}).then(userRes => {
			
            if (!userRes) {
                return res.status(200).json({
                    message: "Either email wrong",
                    success: false
                });
            }
            fetchedUser = userRes;	
            console.log(fetchedUser);
            console.log(req.body.password);
            console.log(fetchedUser.password);	
            return bcrypt.compare(req.body.password, fetchedUser.password);
        }).then(result => {
		
            if (!result) {
                return res.status(200).json({
                    message: "Either password wrong",
					success: false
                });
            }
            // generate json web token
            if (fetchedUser.twoFactor == true){
               token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_should_long_enough', { expiresIn: '1h' })

            }else{
						 
					// i am only generating the otp and saving it to database.please mail it to user email. OTp is only valid for 15 minutes
					var randomOtp = RandomHelper.generateOtp();
					console.log('randomOtp')
					//console.log(" i am only generating the otp and saving it to database.please mail it to user email: " + randomOtp);
					const otp = new UserOtp({ otp: randomOtp, sendAt: Date.now(), otpType: "email", userId: fetchedUser._id });
					otp.save()
					.then(result => {						
						
						// send mail to user for validate email and send password create
						var mailOptions = {
						from: 'mailer@digibit.org',
						to:req.body.email,
						subject: 'DIGICRYPT 2FA Auth Code ',
						text: 'This email contains your 2 Factor Authentication code to complete your login at DIGICRYPT.net. Code: '+randomOtp
						};
					
						transporter.sendMail(mailOptions, function(error, info){
							if (error) {
								console.log(error);										
							} else {
							console.log('Email sent: ' + info.response);
							}
						});
							
					});
				 		
            }

            return res.status(200).json({
                message: "Authentication successfull",
                email: fetchedUser.email,
                _id: fetchedUser._id,
                success: true
            })
			
        }).catch(err => {
            res.status(200).json({
                message: "Authentication failed: "+ err,
				success:false
            });
        })
    }, 

    authenticateUser: (req, res, next) =>{
        let fetchedUser;
        let token;
        let verified = false;
        console.log("caaled");
        User.findOne({ email: req.body.email }).then(user => {
            console.log(user);
            if (!user) {
                return res.status(200).json({
                    message: "Either email or password wrong",
					success:false
                });
            }
            fetchedUser = user;
            console.log(req.body.password);
            console.log(user.password)
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            console.log()
            if (!result) {
                return res.status(200).json({
                    message: "Either email or password wrong",
					success:false
                });
            }
            if(fetchedUser.twoFactor == true){
                verified = speakeasy.totp.verify({
                    secret: fetchedUser.salt,
                    encoding: 'base32',
                    window: 15,
                    token: req.body.otp
                });
                if (verified == true) {
                    token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_should_long_enough', { expiresIn: '1h' });
                    return res.status(200).json({
                        message: "Authentication successfull",
                        token: token,
						success:true,
                        expiresIn: 3600,
						userData: fetchedUser,
                        firstname: fetchedUser.firstname,
                        lastname: fetchedUser.lastname
                    })

                }
                else {
                    return res.status(200).json({
                        message: "Otp is invalid",
						success:false
                    })
                }
            }
            else{
                UserOtp.findOne({ userId: fetchedUser._id, otpType: "email" }).sort({ field: 'asc', _id: -1 })
                    .then(userOtpRes => {
						console.log(userOtpRes)
                        if (((Date.now() - Number(userOtpRes.sendAt)) / (1000 * 60)) <= 15 && userOtpRes.otp === req.body.otp) {
                          verified = true;
                        } else {
                          verified = false;
                        }
                        if (verified == true) {
                            token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_should_long_enough', { expiresIn: '1h' });
                            return res.status(200).json({
                                message: "Authentication successfull",
                                token: token,
								success:true,
                                expiresIn: 3600,
                                userData: fetchedUser
                                
                            })

                        }
                        else {
                            res.status(200).json({
                                message: "Otp is invalid",
								success:false
                            })
                        }
                    });
            }
            // generate json web token
        }).catch(err => {
            res.status(200).json({
                message: "Authentication failed: " + err,
				success:false
            });
        })
    },
    registerUser:(req, res, next) => {
        let addressCountSetting = "";
        let fetchedWallet = "";
        let secretToken = "";
        let secretTokenSet = "";
        let user="";
		
		/*	
		var secretKey = "6LeBhm8UAAAAANZ-dRBUAblfcrvYPLBJonCIPC7c";
		var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptcha + "&remoteip=" + req.body.ipaddress;
			request(verificationUrl,function(error,response,body) {
				body = JSON.parse(body);
				// Success will be true or false depending upon captcha validation.
				if(body.success !== undefined && !body.success) {
						return res.status(200).json(
						{
						message:"Failed captcha verification",
						success:false
						});
				}				
				next();			
				
			});

		*/
		
		// email allready exit check
		User.findOne({email: req.body.email})
		.then(user => {
			if (user) {
				return res.status(200).json(
					{
						message:"user allready exist",
						success:false
					});
				return;	
			}
			
			// email valid
			
			
		  Setting.findOne({key: "addressCount"})
            .then(setting => {
                addressCountSetting = setting;
                console.log("setting fetched");
                console.log(addressCountSetting);
                return addressCountSetting;
            })
            .then(setting => {
                console.log("in setting");
                console.log(setting);
                return  Wallet.findOne({index: parseInt(setting.value) + 1})
                    .then(wallet => {
                        fetchedWallet = wallet;
                        console.log("wallet fetched");
                        return fetchedWallet;
                    })
            })
            .then(wallet => {
                console.log("wallet called");	
                // console.log(wallet.length);
                if (wallet != null){

                    bcrypt.hash(req.body.email, 10)
                        .then((hashedPassword) => {
                            secretToken = RandomHelper.generatePasswordKey();
                            secretTokenSet = speakeasy.generateSecret({ length: 20 });
                            console.log(secretTokenSet);
                            user = new User({
                                email: req.body.email,
                                // password: hashedPassword,
                                addressHistory: [],
                                address: { current:wallet.address, default:wallet.address},
                                salt: secretTokenSet.base32,
                                oauthUrl: secretTokenSet.otpauth_url,
                                keys: [],                          
                            });
                            console.log(user);
                            const otp = new UserOtp();
                            var task = Fawn.Task();
                            
                            task
                              .save(User, user)
                              .update(Wallet, { _id: wallet._id }, { userId: { $ojFuture: "0._id"} })
                              .update(Setting, { _id: addressCountSetting._id }, { value: Number(addressCountSetting.value) + 1 })			
                              .save(UserOtp, { otp: secretToken, sendAt: Date.now(), otpType: "password", userId: { $ojFuture: "0._id"}, expire: "" })
                              .run({ useMongoose: true })						  
                              .then(result => {
                                // send mail to user for validate email and send password create
                                var mailOptions = {
                                from: 'mailer@digibit.org',
                                to:req.body.email,
                                subject: '[DIGICRYPT] Account Registration ',
                                text: 'To finish activating your account, you must click this link: http://172.104.173.247:3000/set_password/'+secretToken
                                };
                                
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);										
                                    } else {
                                    console.log('Email sent: ' + info.response);
                                    }
                                });
									
								
								
                                console.log("result is:");
                                console.log(result);
                                console.log(result[0]._id);
                                res
                                  .status(201)
                                  .json({
                                      hashPassword:result[0].activateUrl,
                                    success: true
                                  });
                              });
                        });
                }	
                else{
                    res.status(200).json({
                        message: "wallet does not exist"
                    })
                }		
            })
            .catch(error =>{
                res.status(501).json({success: false, message: "Error occured: "+ error})
             });
			
			
		})
		
      
    },
	
	forgotPasswordUser:(req, res, next) => {			
		
        // email allready exit check
        console.log(req.body.email);
		User.findOne({email: req.body.email})
		.then(user => {
			if (!user) {
				return res.status(200).json(
					{
						message:"user not register ",
						success:false
					});
				
			}else{
                
                var random = RandomHelper.generatePasswordKey();
                const otp = new UserOtp({ otp: random, sendAt: Date.now(), otpType: "password", userId: user._id , expire: ""});
                otp.save()
                    .then(resultRes => {

                        // send mail to user for validate email and send password create
                        var mailOptions = {
                            from: 'mailer@digibit.org',
                            to: req.body.email,
                            subject: '[DIGICRYPT] Account Forgot Password ',
                            text: 'To set your password , you must click this link: http://172.104.173.247:3000/set_password/' + random
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {

                                res.status(201).json({
                                    message: 'Send mail to your email Address.',
                                    success: true
                                });

                                console.log('Email sent: ' + info.response);
                            }
                        })


                    });
			}
			
		}).catch(error =>{
			res.status(200).json({success: false, message: "Error occured: "+ error})
		});
		
      
    },

    enableTwoFa: (req, res, next) =>{
		// Currently we are sending email from the frontend to test the api, once rajendra create the middleware to find the user id from the jwt token , then we can use user id            console.log(user);

		User.findOne({email: req.body.email})
			.then(user => {
				if (!user) {
					res.status(200).json(
						{
							success:false,
							message:"user does not exist"
						});
				}
				console.log(user._id);
				
				User.update({email:req.body.email},{twoFactor: true})
					.then(result => {
						console.log(result);
						if (result.nModified >0) {
							res.status(200).json(
								{
									success:true,
									message:"Two factor enabled successfully"
								});
						} 
						else {
							res.status(200).json({
								success:false,
								message:"Error occured while enabling the two factor"
							});
						}
					});
				})
				.catch(error => {
					res.status(200).json({
						success:false,
						message:"Error occured: " +error
					});
				});
	}, 
	requestEnableTwoFa: (req, res, next) => {
		// Currently we are sending email from the frontend to test the api, once rajendra create the middleware to find the user id from the jwt token , then we can use user id            console.log(user);
		let randomKeyGen = [];
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					res.status(401).json(
						{
							message: "user does not exist"
						});
				}
				if (user.get('keys').length > 0){
					res.status(200).json({
						success:true,
						data_keys: user.get('keys')
					})
				}
				else{
					randomKey = RandomHelper.randomAplhabetTwoFa();
					randomValues = RandomHelper.randomNumericTwoFa();

					for(i = 0; i< randomKey.length ;i ++){
						randomKeyGen.push({index: i, key: randomKey.charAt(i), value: randomValues[i]});
					}
					User.update({ _id: user._id }, { keys: randomKeyGen})
						.then(result => {
							console.log(result);
							if (result.nModified > 0) {
								res.status(200).json(
									{
										success:true,
										data_keys: randomKeyGen
									});
							}
							else {
								res.status(401).json({
									message: "Error occured while enabling the two factor"
								});
							}
						});
				}
			}).catch(error => {
				res.status(401).json({
					message: "Error occured: " + error
				});
			});
	}, 

		
	setPasswordUser: (req, res, next) => {
        UserOtp.findOne({ otp: req.body.token, otpType: "password", expire: null}).sort({ field: 'asc', _id: -1 })
            .then(userOtp => {
                console.log(userOtp);
                if(userOtp == null){
                   return res.status(200).json({
                        success: false,
                        message: "invalid token"
                    });
                }
                else if(userOtp.expire != null){
                    return res.status(200).json({
                        success: false,
                        message: "token is expired"
                    });
                }
                else if (((Date.now() - Number(userOtp.sendAt)) / (1000 * 60)) >= 15000){
                   return res.status(200).json({
                        success: false,
                        message: "token is expired"
                    });
                }
                if(req.body.password != req.body.confirmPassword){
                    return res.status(200).json({
                        success: false,
                        message: "password and password confirmation does not match"
                    });
                }else{
                    User.findOne({_id: userOtp.userId})
                        .then(user => {
                            bcrypt.hash(req.body.password, 10)
                                .then((hashedPassword) => {
                                    var task = Fawn.Task();
                                    task
                                        .update(User, {_id: user._id}, {password: hashedPassword})
                                        .update(UserOtp, { _id: userOtp._id}, {expire: Date.now()})
                                        .run({useMongoose: true})
                                        .then(result =>{
                                            res.status(200).json({
                                                success: true,
                                                message: "password updated successfully"
                                            })
                                        })
                                })
                                .catch(error => {
                                    res.status(200).json({
                                        message: "Error occured: " + error,
                                        success: false
                                    });
                                })
                        });
                }
            })
            .catch(error =>{
                res.status(200).json({
                    message: "Error occured: " + error,
                    success: false
                });
            })

		// User.findOne({ activateUrl: req.body.token },{email:1})
		// 	.then(user => {
		// 		console.log(req.body.token)
		// 		if (!user) {
		// 			res.status(200).json(
		// 				{
		// 					message: "user token not valid",
		// 					success: false
		// 				});
		// 		}else{
		// 			console.log(user)
		// 			// hash password and save
		// 			 bcrypt.hash(req.body.password, 10)					 
		// 				.then((hashedPassword) => {
							
		// 				User.update({ _id: user._id }, { password: hashedPassword,status:'active'})
		// 					.then(result => {
		// 							console.log(hashedPassword)
		// 							res.status(200).json(
		// 							{
		// 							message: "Your password Set successfully.",
		// 							success: true
		// 							});
							
						
		// 				})	
					
		// 			})		
		// 			// end hash password and save					
					
		// 		}				
				
		// 	})
		// 	.catch(error => {
		// 		res.status(401).json({
		// 			message: "Error occured: " + error,
		// 			success: false
		// 		});
		// 	});
	}, 

	
	 requestDisbaleTwoFa: (req, res, next) => {
        let fetchedUser = "";
        User.findOne({ email: req.body.email }).then(user => {
            console.log(user);
            if (!user) {
                res.status(401).json({
					success:false,
                    message: "Either email or password wrong"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if (!result) {
                res.status(401).json({
					success:false,
                    message: "Either email or password wrong"
                });
            }
            
            var random = RandomHelper.generateDisableTwoFaKey();
            var userKeys = []
            var requestKey = []
            fetchedUser.keys.forEach(element => {
              userKeys.push(element.key);
            });
            for(i =0;i< random.length; i++){
                requestKey.push(userKeys[random.charAt(i)])
            }
            console.log(random);
            console.log(requestKey);
            const otp = new UserOtp({ otp: random, sendAt: Date.now(), otpType: "2fa", userId: fetchedUser._id});
            otp.save()
                .then(result => {                    
                    res.status(200).json({ success:true,key: requestKey,message:'Please Verify ' });
                });
        })
        .catch(error => {
            res.status(500).json({
				success:false,
                message: "Error occured: "+ error
            }).catch(error => {
	                res.status(501).json({ success: false, message: "Error occured: " + error })
            });
        });
    },
    disbaleTwoFa: (req, res, next) => {
        let fetchedUser = "";
        User.findOne({ email: req.body.email }).then(user => {
            console.log(user);
            if (!user) {
                res.status(200).json({
					success:false,
                    message: "Either email or password wrong"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if (!result) {
                res.status(200).json({
					success:false,
                    message: "Either email or password wrong"
                });
            }

            UserOtp.findOne({ userId: fetchedUser._id, otpType: "2fa" }).sort({ field: 'asc', _id: -1 })
                .then(otp => {
                    if(((Date.now() - Number(otp.sendAt)) / (1000 * 60 )) > 15){
                        res.status(200).json({
							success:false,
                            message: "Key has been expired"
                        })
                    }
                    else{
                        var random = otp.otp;
                        var userValues = []
                        var requestValue = ""
                        fetchedUser.keys.forEach(element => {
                            userValues.push(element.value);
                        });
                        for (i = 0; i < random.length; i++) {
                            requestValue += userValues[random.charAt(i)];
                        }
                        console.log((Date.now - Number(otp.sendAt)) - (1000 * 60));
                        if(requestValue === req.body.value){
                            User.update({ email: req.body.email }, { twoFactor: false})
                                .then(result => {
                                    if(result.nModified > 0){
                                        res.status(200).json({
											success:true,
                                            message: "2fa disabled successfully"
                                        })
                                    }
                                    else{
                                        res.status(200).json({
											success:false,
                                            message: "Your 2FA allready disabling"
                                        })
                                    }
                                })
                        }else{
                            res.status(200).json({
								success:false,
                                message: "Value does not match"
                            })
                        }
                    }
                })
        })
        .catch(error => {
            res.status(200).json({
                message: "Error occured: " + error
            })
        });
    },

    resendOtp: (req, res, next) => {
        User.findOne({ email: req.body.email }).then(user => {
            console.log(user);
            if (!user) {
                res.status(401).json({
                    message: "User does not exist"
                });
            }
            // i am only generating the otp and saving it to database.please mail it to user email. OTp is only valid for 15 minutes
            var randomOtp = RandomHelper.generateOtp();
            console.log(" i am only generating the otp and saving it to database.please mail it to user email: " + randomOtp);
            const otp = new UserOtp({ otp: randomOtp, sendAt: Date.now(), otpType: "email", userId: user._id });
            otp.save()
                .then(result => {
                    console.log(result)
                    res.status(200).json({ message: "Otp send successfully"});
                });
        })
        .catch(error =>{
            res.status(500).json({
                message: "Error occured: "+ error
            })
        });
    }


}
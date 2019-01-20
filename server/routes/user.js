const usercontroller = require('./../controllers/user.ctrl')
const checkAuth = require('./../middleware/auth')

module.exports = (router) => {    
   

    /**
     * get a user profile
     */
    router
        .route('/user/valid')
        .get(checkAuth,usercontroller.getValid)
   
    /**
     * get a user profile
     */
    router
        .route('/user/profile/:id')
        .get(checkAuth,usercontroller.getUserProfile)

	   /**
     * get a user profile
     */
    router
        .route('/user/orders')
        .post(checkAuth,usercontroller.getUserOrders)	
    /**
     * adds a user
     */
    router
        .route('/user')
        .post(checkAuth,usercontroller.addUser)


    /**
     * adds a user
     */
    router
        .route('/user/login')
        .post(usercontroller.doLogin)   

    /**
     * follow a user
     */
    router
        .route('/user/follow')
        .post(usercontroller.followUser)
   /**
     * follow a user
     */
    router
        .route('/user/checkemail')
        .post(checkAuth,usercontroller.checkUser)

   /**
     *  user public key assign
     
    router
        .route('/user/assignkey')
        .post(usercontroller.assignKey)
        */
    router.route('/user/signup').post(usercontroller.registerUser);
	
   // router.route('/user/activateUser').post(usercontroller.activateUser); // rajendra
    router.route('/user/setPasswordUser').post(usercontroller.setPasswordUser); // rajendra
    router.route('/user/forgotPasswordUser').post(usercontroller.forgotPasswordUser); // Rajenda

    router
      .route("/user/authenticateUser") // login with otp
      .post(usercontroller.authenticateUser);

    router
        .route("/user/authenticateCredential") // login
        .post(usercontroller.authenticateCredential);

    router
        .route("/user/enableTwoFa")
        .put(usercontroller.enableTwoFa);

    router
        .route("/user/requestEnableTwoFa")
        .post(usercontroller.requestEnableTwoFa);

	 router
      .route("/user/requestDisableTwoFa")
      .post(usercontroller.requestDisbaleTwoFa);

    router
      .route("/user/disableTwoFa")
      .post(usercontroller.disbaleTwoFa);

    router
        .route("/user/resendOtp")
        .post(usercontroller.resendOtp);	
}
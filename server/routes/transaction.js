const transactionController = require('./../controllers/transaction.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
const checkAuth = require('./../middleware/auth')

module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/transaction')
        .post(checkAuth,transactionController.addAll)
	router
        .route('/transaction_status/:id')
        .get(checkAuth,transactionController.transactionStatus)
	router
        .route('/transaction_details/:id')
        .get(checkAuth,transactionController.transactionDetails)
	
   
}
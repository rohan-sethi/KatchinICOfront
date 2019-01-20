const conversionController = require('./../controllers/conversion.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
const checkAuth = require('./../middleware/auth')


module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/conversion')
        .get(checkAuth,conversionController.getAll)

   
}
const plancontroller = require('./../controllers/plan.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/plan')
        .get(plancontroller.getAll)

    /**
     * add an article
     */
   
    /**
     * get a particlular article to view
     */
    router
        .route('/plan/:id')
        .get(plancontroller.getPlan)
}
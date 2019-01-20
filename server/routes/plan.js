const plancontroller = require('./../controllers/plan.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
const checkAuth = require('./../middleware/auth')

module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/plan')
        .get(plancontroller.getAll)

    /**
     * add an article
     
    router
        .route('/plan')
        .post(multipartWare, plancontroller.addPlan)  

    /**
     * get a particlular article to view
     */
    router
        .route('/plan/:id')
        .post(checkAuth,plancontroller.getPlan)
}
const user = require('./user')
const article = require('./article')
const plan = require('./plan')
const conversion = require('./conversion')
const transaction = require('./transaction')
module.exports = (router) => {
    user(router)
    article(router)
    plan(router)
	conversion(router)
	transaction(router)
}
/** */
const Plan = require('./../models/Plan')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')
console.log('plan call');

module.exports = {
    getAll: (req, res, next) => {		
		 db.Plan.find()
		.then(notes => {
		console.log(notes);
		res.send(notes);
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
        console.log('___');
        console.log(req.params.id);
        Plan.findById(req.params.id)
       
    }
}
const mongoose = require('mongoose')
let PlanSchema = new mongoose.Schema(
    {
        name: String 
    }
);

module.exports = mongoose.model('Plan', PlanSchema);
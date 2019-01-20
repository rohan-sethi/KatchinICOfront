const mongoose = require('mongoose')
let PlanSchema = new mongoose.Schema(
    {
        name: String,
        description:String,
        range_start:Number,
        range_end:Number,
        days:Number,
        type:String,
        price:String,
        created_date: Date

    }
);

module.exports = mongoose.model('Plan', PlanSchema);
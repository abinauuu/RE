const mongoose = require("mongoose")

const investmentSchema = mongoose.Schema({
    investor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true
    },
    tokensOwned:{
        type:Number,
        default:0
    },
    investedAmount:{
        type:Number,
        default:0
    },
    averageBuyPrice:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})
module.exports = mongoose.model("investments",investmentSchema)
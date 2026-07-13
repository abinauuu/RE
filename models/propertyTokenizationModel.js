const mongoose = require("mongoose")
const DEFAULT_TOKEN_SUPPLY = require("../constants")
const propertytokenizationSchema = mongoose.Schema({
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Property",
        required:true,
        unique:true
    },
    totalSupply:{
        type:Number,
        required:true,
        default:DEFAULT_TOKEN_SUPPLY,
        immutable:true
    },
    availableSupply:{
        type:Number,
        min:0
    },
    status:{
        type:String,
        enum:["ACTIVE","SOLD"],
        default:"ACTIVE"
    }
})
module.exports=mongoose.model("propertyTokenization",propertytokenizationSchema)
const mongoose= require("mongoose")

const propertySchema = mongoose.Schema({
    area_type:{
        type : String,
        required :true
    },
    location:{
        type : String,
        required :true,
        default:"bengaluru"
    },
    availability:{
        type : String,
        required :true
    },
    size:{
        type : String,
        required :true
    },
    society:{
        type : String,
        default:"unknown"
    },
    area:{
        type : Number,
        required :true,
        min:0
    },
    bath:{
        type : Number,
        required :true,
        min:0
    },
    balcony:{
        type : Number,
        required :true,
        min:0
    },
    price:{
        type : Number,
        required :true,
        min:0
    },
    totalTokens:{
        type:Number
    },
    availableTokens:{
        type:Number
    },
    tokenPrice:{
        type:Number
    }
},{
    timestamps:true
})

module.exports= mongoose.model("Property",propertySchema)
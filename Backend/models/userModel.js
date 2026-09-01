const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username : {
        type : String,
        required :[true,"please choose a username"]
    },
    PAN_card : {
        type : String,
        required :[true,"please choose a username"],
        unique:[true,"PAN CARD already registered"]
    },
    phone : {
        type : String,
        required :[true,"please choose a username"],
        unique:[true,"Phone number already registered"]
    },
    email: {
        type : String,
        required :[true,"please choose a username"],
        unique:[true,"email already registered"]
    },
    password:{
        type : String,
        required :[true,"please choose a password"]
    },
    savedProperties: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }],
    default: []
}
})
module.exports = mongoose.model("user",userSchema)
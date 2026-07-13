const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Property = require("../models/propertyModel")
const propertyTokenization = require("../models/propertyTokenizationModel")

const investInProperty = asyncHandler(async(req,res)=>{
    const propertyId = req.params.propertyId;
    const {investmentAmount} = req.body;
    const investor = req.body.id;

    const property = await Property.findbyId(propertyId);
    if(!property){
        res.status(404).json({message:"property does not exist"})
    }


})

module.exports = investInProperty;

/*take values(user and pr0perty(params)) from req done
user should be validated done by validatetoken
property should exist done
input for the amount to be invested
validate the investment amount shouldnt be zero
calculate the tokens 
check for the availability
deduct the tokens fron the property and update
check for investments from user
if exists update it
if not create new */
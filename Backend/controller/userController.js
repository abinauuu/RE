const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async(req,res)=>{
    const {username,PAN_card,password,phone,email} = req.body;
    if(!username || !email || !phone || !password || !PAN_card){
        res.status(400);
        throw new Error("All details are compulsory")
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username:username,
        email : email,
        phone : phone,
        password : hashedpassword,
        PAN_card : PAN_card
    })
    res.status(201).json(user)
})
const loginUser = asyncHandler(async(req,res)=>{
    const {phone,password}=req.body;
    const user =await User.findOne({phone : phone})
    if(!user){
        res.status(404)
        throw new Error("User does not exist")
    }
    const isMatch =await bcrypt.compare(password,user.password)

    if(isMatch){
        const token = jwt.sign(
            {
                id:user.id
            },process.env.SECRET_KEY,{
                expiresIn : "1h"
            }
        )
            res.status(200).json({message :"user logged in",
                token:token})
            console.log("user logged in")
        }else{
            res.status(400)
            throw new Error("credentials dont match")
        }
})

const currentUser = asyncHandler(async(req,res)=>{
    const user= await User.findOne({_id:req.user._id}).select("-password")
        .populate("savedProperties");
    res.status(200).json(user)

})

const addToFav=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);
    const propertyId = req.params.propertyId;

    if(user.savedProperties.includes(propertyId)){
        return res.status(400).json({message:"property already saved"})
    }
    user.savedProperties.push(propertyId)
    await user.save();
    res.status(200).json({message:"saved to favs"})
})
const removeFromFav=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id)
    user.savedProperties.pull(req.params.propertyId)
    await user.save()
    res.status(200).json({message:"property removed from favs"})
})
const getFav=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id).populate("savedProperties");
    res.status(200).json(user.savedProperties)
})

module.exports={registerUser,loginUser,currentUser,addToFav,removeFromFav,getFav};
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Property = require("../models/propertyModel")
const PriceHistory = require("../models/priceHistoryModel");

const getProperties = asyncHandler(async (req, res) => {
    //add the area bath balcony based sorting 

    const page = Number(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const queryobj ={};

    //location filter
    if(req.query.location){
        queryobj.location = req.query.location  
    }
    //price filter
    if (req.query.minPrice || req.query.maxPrice) {
    queryobj.price = {};
        if (req.query.minPrice) {
        queryobj.price.$gte = Number(req.query.minPrice);
        }
        if (req.query.maxPrice) {
        queryobj.price.$lte = Number(req.query.maxPrice);
        }
    }
    //bathroom filter
    if(req.query.bath){
        queryobj.bath=req.query.bath
    }
    //balcoy filter
    if(req.query.balcony){
        queryobj.balcony=req.query.balcony
    }
    //size filter
    if(req.query.minArea||req.query.maxArea){
        queryobj.area={};
        if(req.query.minArea){
            queryobj.area.$gte=Number(req.query.minArea)
        }
        if(req.query.maxArea){
            queryobj.area.$lte=Number(req.query.maxArea)
        }

    }

    const properties = await Property.find(queryobj)
        .skip(skip)
        .limit(limit);
    res.status(200).json(properties);
});

const getPropertiesbyId=asyncHandler(async(req,res)=>{
    const propertyId=req.params.id
    const property = await Property.findById(propertyId)
    if(!propertyId){
        res.status(404).json({message:"no such property found"})
    }
    res.status(200).json(property)
})

const getPriceHistory = asyncHandler(async(req,res)=>{
    const history = await PriceHistory.find({
        property : req.params.id
    }).sort({date : 1})

    res.status(200).json(history)
})

module.exports = {getProperties,getPropertiesbyId,getPriceHistory}
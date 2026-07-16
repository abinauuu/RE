/* add mongoose sessions for synced investments updates in tokens being credited to the user and tokens being deducted from the available supply*/

const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Property = require("../models/propertyModel")
const propertyTokenization = require("../models/propertyTokenizationModel")
const Investment = require("../models/investmentModel")
const {calculateTokenPrice,calculateTokensPurchased} =require("../services/tokenization")

const investInProperty= asyncHandler(async(req,res)=>{
    const propertyId = req.params.propertyId;
    const investedAmount = req.body.investedAmount;
    const investor = req.user.id;

    //validate investment amount
    if (!Number.isFinite(Number(investedAmount)) || Number(investedAmount) <= 0) {
        return res.status(400).json({
            message: "Please enter a valid investment amount."
        });
    }

    const property = await Property.findById(propertyId);
    if(!property){
        return res.status(404).json({message:"property does not exist"})
    }
    const propertyTokens = await propertyTokenization.findOne({property:propertyId})
    if(!propertyTokens){
        return res.status(404).json({message:"property not tokenized"})
    }

    const tokenPrice = calculateTokenPrice(property.price);
    const tokenPurchased=calculateTokensPurchased(Number(investedAmount),tokenPrice);

    if(tokenPurchased>propertyTokens.availableSupply){
        return res.status(400).json({message:"not enough tokens"})
    }

    let investment = await Investment.findOne({
        investor,
        property:propertyId
    })

    if (!investment) {

        investment = await Investment.create({
            investor,
            property: propertyId,
            tokensOwned: tokenPurchased,
            investedAmount: Number(investedAmount),
            averageBuyPrice: tokenPrice
        });

    }else {

        const oldTokens = investment.tokensOwned;
        const oldAveragePrice = investment.averageBuyPrice;

        const totalCost =
            (oldTokens * oldAveragePrice) +
            (tokenPurchased * tokenPrice);

        const totalTokens = oldTokens + tokenPurchased;

        investment.averageBuyPrice = totalCost / totalTokens;
        investment.tokensOwned = totalTokens;
        investment.investedAmount += Number(investedAmount);

        await investment.save();
    }

     propertyTokens.availableSupply -= tokenPurchased;

    if (propertyTokens.availableSupply === 0) {
        propertyTokens.status = "SOLD";
    }

    await propertyTokens.save();

    return res.status(200).json({message:"Investment Successful",investment})
})

module.exports = investInProperty;
const Property = require("../models/propertyModel")
const priceHistory = require("../models/priceHistoryModel")

const simulateMarket = async()=>{

    console.log("market simulation started")
    
    try{
        const properties = await Property.find();
        const marketGrowth = 0.7;

        for(const property of properties){
            await priceHistory.create({
                property : property._id,
                price : property.price
            })
            const randomGrowth = Math.random()*1 + 0.5;
            const totalGrowth = randomGrowth + marketGrowth;
            const newPrice = property.price*(1+totalGrowth/100)
            property.price=Number(newPrice.toFixed(2))
            await property.save()
        }
        console.log("market updated")
    }
    catch(error){
        console.log(error);
    }
}

module.exports=simulateMarket;

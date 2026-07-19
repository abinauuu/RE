const mongoose = require("mongoose");
const Property = require("../models/propertyModel");
const connectdb=require("../config/db")
require("dotenv").config();

const convertPrices = async () => {
    try {
        connectdb();

        // Only fetch properties that still appear to be stored in lakhs
        const properties = await Property.find({
            price: { $lt: 1000 }
        });

        if (properties.length === 0) {
            console.log("✅ No properties need conversion.");
            process.exit(0);
        }

        for (const property of properties) {
            property.price *= 100000;
            await property.save();

            console.log(
                `${property._id} -> Updated price to ₹${property.price}`
            );
        }

        console.log("✅ All remaining property prices converted successfully.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

convertPrices();
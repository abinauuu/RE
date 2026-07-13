require("dotenv").config();

const mongoose = require("mongoose");
const Property = require("../models/propertyModel");
const properties = require("../data/properties.json");

mongoose.connect(process.env.MONGO_URI);

async function seedData() {
    try {
        await Property.deleteMany();

        const inserted = await Property.insertMany(properties);

        console.log(`${inserted.length} properties inserted.`);

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedData();
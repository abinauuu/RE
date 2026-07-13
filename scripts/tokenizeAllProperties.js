require("dotenv").config();
const mongoose = require("mongoose");
const connectdb = require("../config/db")

const Property = require("../models/propertyModel");
const PropertyTokenization = require("../models/propertyTokenizationModel");
const DEFAULT_TOKEN_SUPPLY = require("../constants");

async function tokenizeAllProperties() {
    try {
        connectdb();

        const properties = await Property.find();

        for (const property of properties) {

            const tokenized = await PropertyTokenization.findOne({
                property: property._id
            });

            if (tokenized) continue;

            await PropertyTokenization.create({
                property: property._id,
                totalSupply: DEFAULT_TOKEN_SUPPLY,
                availableSupply: DEFAULT_TOKEN_SUPPLY,
                status: "ACTIVE"
            });
        }

        console.log("All properties have been tokenized.");

        process.exit(0);

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
}

tokenizeAllProperties();
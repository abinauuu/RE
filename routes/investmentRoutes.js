const express = require("express")
const router = express.Router();

const validateToken = require("../middleware/validateToken")
const investInProperty = require("../controller/investmentController")

router.post("/:propertyId",validateToken,investInProperty)

module.exports=router;
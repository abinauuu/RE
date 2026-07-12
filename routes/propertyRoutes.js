const express = require("express")
const router = express.Router()
const{getProperties, getPropertiesbyId,getPriceHistory}=require("../controller/propertyController")
const validateToken=require("../middleware/validateToken")

router.get("/",validateToken,getProperties)
router.get("/:id",validateToken,getPropertiesbyId)
router.get("/:id/history",validateToken,getPriceHistory)
module.exports=router;
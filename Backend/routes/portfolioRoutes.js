const express = require("express")
const router = express.Router();
const validateToken = require("../middleware/validateToken")
const getPortfolio = require("../controller/portfolioController")

router.get("/",validateToken,getPortfolio);
module.exports = router;
const express = require("express")
const router = express.Router()
const{registerUser,loginUser,currentUser,getFav,addToFav,removeFromFav} = require("../controller/userController")
const validateToken = require("../middleware/validateToken")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/profile",validateToken,currentUser)
router.get("/favourites",validateToken,getFav)
router.post("/favourites/:propertyId",validateToken,addToFav)
router.delete("/favourites/:propertyId",validateToken,removeFromFav)

module.exports= router; 
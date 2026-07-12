const express = require("express")
const dotenv=require("dotenv")
dotenv.config()
const connectdb = require("./config/db.js")
connectdb();
const simulateMarket = require("./services/marketSimulation.js")
setInterval(()=>{simulateMarket();},3600000)
const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRoutes.js")
app.use("/api/user",userRoutes)
const propertyRoutes=require("./routes/propertyRoutes.js")
app.use("/api/properties",propertyRoutes)
const investmentroutes = require("./routes/investmentRoutes.js")
app.use("/api/investments",investmentroutes)

app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})
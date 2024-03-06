const express= require('express');
const app= express()
const cors= require('cors');
const connectDb = require('./db/connectDb');
const dotenv= require('dotenv');
const port= process.env.PORT||5000;
const authRouter = require('./routes/auth');
const salesRouter = require('./routes/sales');
const productRouter = require('./routes/products');
const shopRouter = require('./routes/shops');
const branchRouter = require('./routes/branches');
const storeKeeperRouter=require("./routes/store-keepers")
const compression= require("compression")
const {rateLimit}= require("express-rate-limit");
dotenv.config();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
const limiter= rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:"draft-7",
    legacyHeaders:false
})
app.use(limiter)
app.use(cors({ origin: null , credentials :  true,allowedHeaders:['Content-Type', 'Authorization']}));
app.use(express.json());
app.use(compression())
app.use('/api/v1/',authRouter);
app.use('/api/v1/',salesRouter);
app.use('/api/v1/',productRouter);
app.use('/api/v1/',shopRouter);
app.use('/api/v1/',branchRouter);
app.use('/api/v1/',storeKeeperRouter);
const start= async()=>{
    try {
        await connectDb(process.env.ConnectionString);
        //Start the Server
app.listen(port,"0.0.0.0",(req,res)=>{


    console.log(`Server is Running at Server ${port} connected to the db`)
    })
    
    } catch (error) {
       throw error
    }
}
module.exports=start
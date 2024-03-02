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
dotenv.config();

app.use(cors({ origin: null , credentials :  true}));
app.use(express.json());
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
app.listen(port,(req,res)=>{


    console.log(`Server is Running at Server ${port} connected to the db`)
    })
    
    } catch (error) {
       throw error
    }
}
module.exports=start
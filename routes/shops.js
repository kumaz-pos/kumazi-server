const express= require('express');
const { getShop,getShops,deleteShop,updateShop ,createShop} = require('../controllers/shops');
const shopRouter=express.Router();
const auth= require('../middleware/auth');
const isAdmin= require("../middleware/isAdmin")
shopRouter.get('/get-shops',auth,isAdmin,getShops);
shopRouter.get('/get-shop/:id',auth,isAdmin,getShop);
shopRouter.post('/create-shop',auth,isAdmin,createShop);
shopRouter.patch('/update-shop/:id',auth,isAdmin,updateShop);
shopRouter.delete('/delete-shop/:id',auth,isAdmin,deleteShop);

module.exports= shopRouter;
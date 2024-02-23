const express= require('express');
const { Register, Login, updateStoreKeeper,deleteStoreKeeper,getStoreKeeper,getStoreKeepers } = require('../controllers/storeKeepers');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');



const storeKeeperRouter=express.Router();


storeKeeperRouter.post('/shop-keeper/register',auth,isAdmin,Register);
storeKeeperRouter.post('/shop-keeper/login',Login);
storeKeeperRouter.get('/shop-keeper/get-store-keepers',auth,getStoreKeepers);
storeKeeperRouter.delete('/shop-keeper/delete-store-keeper/:id',auth,deleteStoreKeeper);






module.exports=storeKeeperRouter
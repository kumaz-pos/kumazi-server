const express= require('express');
const { Register, Login, updateStoreKeeper,deleteStoreKeeper,getStoreKeeper,getStoreKeepers } = require('../controllers/storeKeepers');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');



const storeKeeperRouter=express.Router();


storeKeeperRouter.post('/shop-keeper/register',auth,isAdmin,Register);
storeKeeperRouter.post('/shop-keeper/login',Login);

storeKeeperRouter.get('/shop-keeper/get-store-keepers',auth,isAdmin,getStoreKeepers);
storeKeeperRouter.get('/shop-keeper/get-store-keeper/:id',getStoreKeeper);
storeKeeperRouter.delete('/shop-keeper/delete-store-keeper/:id',deleteStoreKeeper);
storeKeeperRouter.patch('/shop-keeper/update-store-keeper/:id',updateStoreKeeper);





module.exports=storeKeeperRouter
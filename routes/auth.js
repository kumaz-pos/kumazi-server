const express= require('express');
const { Register, Login, userDetails,getStoreKeepers } = require('../controllers/auth');
const auth = require('../middleware/auth');



const authRouter=express.Router();


authRouter.post('/shop-owner/register',Register);
authRouter.post('/shop-owner/login',Login);
authRouter.get('/me/:id',auth,userDetails);
authRouter.get('/storekeepers/:id',auth,getStoreKeepers);





module.exports=authRouter
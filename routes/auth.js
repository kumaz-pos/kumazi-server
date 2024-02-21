const express= require('express');
const { Register, Login, userDetails } = require('../controllers/auth');
const auth = require('../middleware/auth');



const authRouter=express.Router();


authRouter.post('/shop-owner/register',Register);
authRouter.post('/shop-owner/login',Login);
authRouter.get('/me/:id',auth,userDetails);





module.exports=authRouter
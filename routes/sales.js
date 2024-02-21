const express= require('express');
//const { Register, Login } = require('../controllers/auth');
const { GetYearlySales,getShopSales,getStoreKeeperSales, createSale, updateSale, deleteSale,getSale,GetDailySales,GetMonthlySales,GetWeeklySales,CumulativeSales } = require('../controllers/sales');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');



const salesRouter=express.Router();


salesRouter.get('/get-storekeeper-sales/:id',auth,getStoreKeeperSales);
salesRouter.get('/get-shop-sales',auth,getShopSales);
salesRouter.get('/get-daily-sales',auth,GetDailySales);
salesRouter.get('/get-weekly-sales',auth,GetWeeklySales);
salesRouter.get('/get-monthly-sales',auth,GetMonthlySales);

salesRouter.get('/cumulative-sales',auth,CumulativeSales);
salesRouter.get('/yearly-sales',auth,GetYearlySales);
salesRouter.get('/get-sale/:id',auth,getSale);
salesRouter.post('/add-sales',auth,createSale);
salesRouter.patch('/update-sale/:id',auth,updateSale);
salesRouter.delete('/delete-sale/:id',auth,deleteSale);





module.exports=salesRouter
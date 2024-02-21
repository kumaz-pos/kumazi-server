const express= require('express');
const { getBranch,getBranches,updateBranch,deleteBranch,createBranch} = require('../controllers/branch');
const branchRouter=express.Router();
const auth= require('../middleware/auth');
const isAdmin= require("../middleware/isAdmin")
branchRouter.get('/get-branches',auth,isAdmin,getBranches);
branchRouter.get('/get-branch/:id',auth,isAdmin,getBranch);
branchRouter.post('/create-branch',auth,isAdmin,createBranch);
branchRouter.patch('/update-branch/:id',auth,isAdmin,updateBranch);
branchRouter.delete('/delete-branch/:id',auth,isAdmin,deleteBranch);

module.exports= branchRouter;
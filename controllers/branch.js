const Branch= require('../models/branches');
const Shop= require("../models/shop")
const createBranch=async(req,res)=>{

let user= req.user;

const shop= await Shop.findOne({owner:user.userId});


    try {
        const branch=await Branch.create({
          branchName: req.body.branchName,
          owner:user.userId,
          
          storeKeeper:req.body.storeKeeper

            
          
           
           

        })
      //  res.status(201).json({msg:"Message Created Succesfully",body,users:req.body.userId})
        res.status(201).json(branch)
    } catch (error) {
        throw error
    }
}


const updateBranch=async(req,res)=>{
    try {
        const id= req.params.id;
const branch =await Branch.findOne({branchName:req.body.branchName});

if (branch) {
    res.status(401).json({message:"The branch name has been taken"})
}else{
    const newBranchName= await Branch.findByIdAndUpdate(id,{$set:req.body},{new:true});
    res.status(201).json(newBranchName)
}
       

    
      
    } catch (error) {
        res.status(500)
    }


  
//res.status(201).json({msg:'intangible Edited Succesfully',intangible})
}



const getBranches=async(req,res)=>{
    try {
        let user= req.user;
        console.log(user);
        const shop= await Shop.findOne({owner:user.userId});
        let shopId= shop._id

   
        const data= await Branch.find({shop:shopId});
        if(!data){
      res.status(200).json([])
        }
        else{
          res.status(200).send(data)
        }
    } catch (error) {
        res.status(500)
    }
  
}
const getBranch=async(req,res)=>{
    try {
        const data=await Branch.findById(req.params.id)
           
    if(!data){
        res.status(200).json({msg:" Branch Not Found Yet"})
          }
          else{
            res.status(200).send(data)
          }
    } catch (error) {
        res.status(500)
    }
   

}

const deleteBranch=async(req,res)=>{
    const id= req.params.id;
    const branch= await Branch.findByIdAndDelete(id)
    res.json({msg:' Branch  Deleted Succesfully'});
}


module.exports={createBranch,updateBranch,deleteBranch,getBranch,getBranches};
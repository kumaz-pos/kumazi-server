const Shop= require('../models/shop');

const createShop=async(req,res)=>{
  req.body.createdBy=req.user.userId;

let user= req.user;

    try {
        const shop=await Shop.create({
          shopName: req.body.shopName,
          owner:user.userId

            
          
           
           

        })
      //  res.status(201).json({msg:"Message Created Succesfully",body,users:req.body.userId})
        res.status(201).json(shop)
    } catch (error) {
        throw error
    }
}


const updateShop=async(req,res)=>{
    try {
        const id= req.params.id;
const shop =await Shop.findOne({shopName:req.body.shopName});
if (shop) {
    res.status(401).json({message:"The shop name has been taken"})
}else{
    const newShopName= await Shop.findByIdAndUpdate(id,{$set:req.body},{new:true});
    res.status(201).json(newShopName)
}
       

    
      
    } catch (error) {
        res.status(500)
    }


  
//res.status(201).json({msg:'intangible Edited Succesfully',intangible})
}



const getShops=async(req,res)=>{
    try {
        let user= req.user;

   console.log(user);
        const data= await Shop.find({owner:user.userId});
        if(!data){
      res.status(200).json({msg:"No Shops yet"})
        }
        else{
          res.status(200).send(data)
        }
    } catch (error) {
        res.status(500)
    }
  
}
const getShop=async(req,res)=>{
    try {
        const data=await Shop.findById(req.params.id)
           
    if(!data){
        res.status(200).json({msg:" Shop Not Found Yet"})
          }
          else{
            res.status(200).send(data)
          }
    } catch (error) {
        res.status(500)
    }
   

}

const deleteShop=async(req,res)=>{
    const id= req.params.id;
    const product= await Shop.findByIdAndDelete(id)
    res.json({msg:' Shop  Deleted Succesfully'});
}


module.exports={createShop,updateShop,getShop,getShops,deleteShop};
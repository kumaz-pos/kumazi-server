const StoreKeepers= require("../models/StoreKeepers");
const bcrypt= require('bcryptjs');
const generateToken= require('../middleware/generateToken')
const Register=async(req,res)=>{
   try {
    let existingUser= await StoreKeepers.findOne({phoneNumber:req.body.phoneNumber});
  
    if (existingUser) {
        res.status(401).json({message:"Phone number already exists"});
    }
    
   
    if (!existingUser) {
        const user=new  StoreKeepers({
        
            name:req.body.name,
            phoneNumber:req.body.phoneNumber,
         
            
          
          
              password:bcrypt.hashSync(req.body.password,8),
              role:req.body.role,
              employer:req.body.employer
              
            },
             
     
    
    )
    const createdUser=  user.save();
    res.status(201).send({
        _id:user._id,
        name:user.name,
        phoneNumber:user.phoneNumber,
        storeName:user.storeName,
        role:user.role,
        owner:user.owner,
      
        token:generateToken(createdUser)
    })
        
     
    }
       



   } catch (error) {
    res.status(500)
   }
  
  






}
const Login=async(req,res)=>{
    
    const user= await StoreKeepers.findOne({phoneNumber:req.body.phoneNumber}).select("+password");
    console.log(user);

    if (user) {
        if (bcrypt.compareSync(req.body.password,user.password)) {
            res.send({
                _id:user._id,
                name:user.name,
                storeName:user.storeName,
                role:user.role,
                phoneNumber:user.phoneNumber,
                employer:user.employer,
               
               
             
               
             
              
                
                token:generateToken(user)
            })
            return 
        }
    }
    res.status(401).send({message:"invalid phone number or password"})
    }
const getStoreKeepers=async(req,res)=>{
    let user=req.user
    try {
      console.log(user.userId);
      let employer= user.userId;
        const storeKeepers= await StoreKeepers.find({employer:employer}).lean();
        if (storeKeepers) {
            res.status(200).json(storeKeepers)
        }else{
            res.status(200).json([])
        }
        console.log(user);
        
       
    } catch (error) {
        res.status(500)
    }

  
    }
const deleteStoreKeeper=async(req,res)=>{
    let user=req.user;
    let id= req.params.id
    try {
      
        const storeKeepers= await StoreKeepers.findByIdAndDelete({_id:id});

        res.status(200).json(storeKeepers);
       
    } catch (error) {
        res.status(500)
    }

  
    }

 
    
   
    module.exports={Register,Login,getStoreKeepers,deleteStoreKeeper}
const User= require("../models/Users");
const bcrypt= require('bcryptjs');
const generateToken= require('../middleware/generateToken');
async function checkExistingUser(model,enteredNumber){
    let user= await model.findOne({phoneNumber:enteredNumber});
    if (!user) {
        return false
    }else{
return true
    }
    
}
const Register=async(req,res)=>{
   try {

   
    let checkUser=await checkExistingUser(User,req.body.phoneNumber);
   
  if (checkUser===true) {
    res.status(401).json({message:"Phone number already exists"});
  }else{
    const user=new  User({
        
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
     
        
      
      
          password:bcrypt.hashSync(req.body.password,8),
          role:req.body.role,
          owner:req.body.owner,
          country:req.body.country
         
        },       
 

)
const createdUser=  user.save();
res.status(201).send({
    _id:user._id,
    name:user.name,
    phoneNumber:user.phoneNumber,
    storeName:user.storeName,
    role:user.role,
    country:user.country,
    owner:user.owner,
  
    token:generateToken(createdUser)
})
    
 
  }
  
   
 



   } catch (error) {
    res.status(500)
   }
  
  






}
const Login=async(req,res)=>{
    
    const user= await User.findOne({phoneNumber:req.body.phoneNumber});

if (user) {
    if (bcrypt.compareSync(req.body.password,user.password)) {
        res.send({
            _id:user._id,
            name:user.name,
            storeName:user.storeName,
            role:user.role,
            phoneNumber:user.phoneNumber,
            country:user.country,
           
           
         
           
         
          
            
            token:generateToken(user)
        })
        return 
    }
}else{
    res.status(401).send({message:"invalid phone number or password"})
}
  
   
    }

    const userDetails=async(req,res)=>{
    
        const user=await User.findById(req.params.id);
        if (user) {
            res.send(user)
        }
        else{
            res.status(404).send('user not found')
        }
    }
    
    const getStoreKeepers=async(req,res)=>{
        try {
            let id= req.params.id
           
            const storekeepers=await User.find({owner:id});
          
            res.status(200).json(storekeepers)
        } catch (error) {
            res.status(500).json({message:"Error in the server"})
        }
      

    }

    module.exports={Register,Login,userDetails,getStoreKeepers}
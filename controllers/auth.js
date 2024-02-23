const User= require("../models/Users");
const bcrypt= require('bcryptjs');
const generateToken= require('../middleware/generateToken')
const Register=async(req,res)=>{
   try {
    let existingUser= await User.findOne({phoneNumber:req.body.phoneNumber});
  
    if (existingUser) {
        res.status(401).json({message:"Phone number already exists"});
    }
    
   
    if (!existingUser) {
        const user=new  User({
        
            name:req.body.name,
            phoneNumber:req.body.phoneNumber,
         
            
          
          
              password:bcrypt.hashSync(req.body.password,8),
              role:req.body.role,
              owner:req.body.owner
              
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
    
    const user= await User.findOne({phoneNumber:req.body.phoneNumber});
    console.log(user);

    if (user) {
        if (bcrypt.compareSync(req.body.password,user.password)) {
            res.send({
                _id:user._id,
                name:user.name,
                storeName:user.storeName,
                role:user.role,
                phoneNumber:user.phoneNumber,
               
               
             
               
             
              
                
                token:generateToken(user)
            })
            return 
        }
    }
    res.status(401).send({message:"invalid phone number or password"})
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
            console.log(id);
            const storekeepers=await User.find({owner:id});
            console.log(storekeepers);
            res.status(200).json(storekeepers)
        } catch (error) {
            res.status(500).json({message:"Error in the server"})
        }
      

    }

    module.exports={Register,Login,userDetails,getStoreKeepers}
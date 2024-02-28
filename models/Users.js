const mongoose= require('mongoose');
const UserSchema= new mongoose.Schema({
   name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:70,
        
    },
  
    phoneNumber:{
        type:String,
        required:true,
       
    },

   
    password:{
        type:String,
        required:true,

        
    },
    id:{type:String},
    role:{
        type:String,
        default:"Owner"
    },
    owner:{
        type:String,
        default:"Owner"
    },
    country:{
        type:String,
        required:true
    }
}
,{
    timestamps:true
}
)



        const User= mongoose.model("UserSchema",UserSchema);

        module.exports=User;
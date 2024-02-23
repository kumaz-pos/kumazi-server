const mongoose= require('mongoose');
const StoreKeeperSchema= new mongoose.Schema({
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
        select:false
    },
   
    role:{
        type:String,
        default:"storeKeeper"
    },
    employer:{
        type:String,
    }
}
,{
    timestamps:true
}
)



        const StoreKeeper= mongoose.model("StoreKeeper",StoreKeeperSchema);

        module.exports=StoreKeeper;
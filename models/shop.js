const mongoose= require('mongoose');
const ShopSchema= new mongoose.Schema({
shopName:{
    type:String,
    required:true
},
    
   owner:{
    type:mongoose.Types.ObjectId,
    ref:"UserSchema"
    }
 
}
,{
    timestamps:true
}
)



        const Shops= mongoose.model("Shops",ShopSchema);

        module.exports=Shops;
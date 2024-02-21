const mongoose= require('mongoose');
const ItemSchema= new mongoose.Schema({
    productId:{ref:"Products",type:mongoose.Schema.Types.ObjectId},
   
     name:{type:String,required:true},
     unit:{type:String,required:true},

     qty:{type:Number,min:1},
     price:{type:Number},
     total:{type:Number,default:0}
 });
const SalesSchema= new mongoose.Schema({
    items: [ItemSchema],
 
    totalPrice:{
        type:Number
    },
  
    paymentMethod:{
        type:String,
        required:true,
        value:["Airtel Money","MTN Money","Cash"]
    },

    
    
    createdBy:{
    type:String,
    required:true
    },
 
   
 
}
,{
    timestamps:true
}
)



        const Sales= mongoose.model("Sales",SalesSchema);

        module.exports=Sales;
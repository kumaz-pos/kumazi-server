const mongoose= require('mongoose');
const ProductsSchema= new mongoose.Schema({
   name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:70,
        
    },
    unit:{
        type:String,
        required:true
    },
    quantityBought:{
        type:Number,
        required:true,
       
    },

    quantitiesSold:{
        type:Number,
        required:true,
    },
    buyingPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
   
    quantityInStock:{
        type:Number,
        required:true
    },
valueOfStock:{
    type:Number,
    required:true
},



    owner:{
        type:mongoose.Types.ObjectId,
    ref:"User"
    }

}
,{
    timestamps:true
}
)



        const Products= mongoose.model("Products",ProductsSchema);

        module.exports=Products;
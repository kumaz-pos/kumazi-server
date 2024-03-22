const Product= require('../models/Products');


const createProduct=async(req,res)=>{
  



 let {name,unit,quantityBought,quantitiesSold,buyingPrice,sellingPrice,quantityInStock,valueOfStock,currency,owner}=req.body


    try {
        const product=await Product.create({
                   name,
            unit,

            quantityBought,
            quantitiesSold,
            
            buyingPrice,
            sellingPrice,
            quantityInStock,
           valueOfStock,
           currency,
       
           owner
           

           
            
            
            
           
           

        })
     
        res.status(201).json(product)
    } catch (error) {
        throw error
    }
}


const updateProduct=async(req,res)=>{
    
try {
  const id= req.params.id;

    const product= await Product.findByIdAndUpdate(id,{$set:req.body},{new:true});
   
    res.status(201).json(product)
} catch (error) {
  res.status(500)
}


  

}



const getProducts=async(req,res)=>{
 let owner= req.params.id;
    const data= await  Product.find({owner}).sort({_id:-1}).lean();
    if(!data){
  res.status(200).json([])
    }
    else{
      res.status(200).send(data)
    }
}
const getProduct=async(req,res)=>{
    try {
      const data=await Product.findById(req.params.id).lean();
   
      if(!data){
    res.status(200).json({msg:" Product Not Found Yet"})
      }else{
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500)
    }
  
   
}

const deleteProduct=async(req,res)=>{
    const id= req.params.id;
    const product= await Product.findByIdAndDelete(id);
 
    res.json({msg:' Product  Deleted Succesfully'});
}


module.exports={createProduct,updateProduct,getProducts,getProduct,deleteProduct};
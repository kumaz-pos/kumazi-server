const Product= require('../models/Products');
const Branch= require('../models/branches');
const Shop= require('../models/shop');

const createProduct=async(req,res)=>{
  


let owner=req.user



    try {
        const product=await Product.create({
            name:req.body.name,
            unit:req.body.unit,

            quantityBought:req.body.quantityBought,
            quantitiesSold:req.body.quantitiesSold,
            
            buyingPrice:req.body.buyingPrice,
            sellingPrice:req.body.sellingPrice,
            quantityInStock:req.body.quantityInStock,
           valueOfStock:req.body.valueOfStock,
           currency:req.body.currency,
       
           owner:req.body.owner
           

           
            
            
            
           
           

        })
      //  res.status(201).json({msg:"Message Created Succesfully",body,users:req.body.userId})
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


  
//res.status(201).json({msg:'intangible Edited Succesfully',intangible})
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
    console.log(product);
    res.json({msg:' Product  Deleted Succesfully'});
}


module.exports={createProduct,updateProduct,getProducts,getProduct,deleteProduct};
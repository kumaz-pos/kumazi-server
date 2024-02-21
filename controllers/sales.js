const Sales= require('../models/Sales');

const Product=require("../models/Products")
const createSale=async(req,res)=>{
   
    let user= req.user;
 
 
    try {
      let items= req.body.items;
  
      
        const sale=await Sales.create({
           items:req.body.items,
           paymentMethod:req.body.paymentMethod,
           
            totalPrice:req.body.totalPrice,
            
            createdBy:req.body.userId
           

        })
     let createdSale= await sale.save();
       
items.forEach(async(item)=>{
    await   Product.updateOne(
           {_id:item.productId},
           {
               $inc:{quantityInStock:-Number(item.qty),
                   quantitiesSold:+Number(item.qty)

                   
               }}
       )
   })
   
  
     
     
    
        res.status(201).json(createdSale)
    } catch (error) {
       res.status(500)
    }
}


const updateSale=async(req,res)=>{
  
try {
    const id= req.params.id;
    const sale= await Sales.findByIdAndUpdate(id,{$set:req.body},{new:true});
    res.status(201).json(sale);
} catch (error) {
    res.status(500)
}
   


  
//res.status(201).json({msg:'intangible Edited Succesfully',intangible})
}



const getStoreKeeperSales=async(req,res)=>{
  //console.log("hello");
   let user= req.user.userId
  // let branchId= req.params.id;
  let storekeeperId= req.params.id
    try {
   
     
        const data= await  Sales.find({createdBy:storekeeperId});
        
        if(!data){
      res.status(200).json([])
        }
        else{
          res.status(200).send(data)
        }
    } catch (error) {
        res.status(500)
    }
   
  
}


const getShopSales=async(req,res)=>{
   let user= req.user
   let createdBy=user.userId
    try {
        
      
        const data= await  Sales.find({createdBy}).sort({_id:-1}) ;
        if(!data){
      res.status(200).json({msg:"You Have Not Added Sales Yet"})
        }
        else{
          res.status(200).send(data)
        }
    } catch (error) {
        res.status(500)
    }
   
  
}

const deleteSale=async(req,res)=>{
    const id= req.params.id;
    const sale= await Sales.findByIdAndDelete(id)
    res.json({msg:' Sales Deleted Succesfully'});
}
const getSale=async(req,res)=>{
    try {
      const data=await Sales.findById(req.params.id)
   
      if(!data){
    res.status(200).json({msg:" Sales Not Found Yet"})
      }else{
        res.status(200).json(data)
      }
    } catch (error) {
      res.status(500)
    }
  
   
}

const GetDailySales=async(req,res)=>{
   let user= req.user;
   let userId= user.userId
  try {
  
    const data= await Sales.aggregate([
        {$match:{"createdBy":userId}},
      {
          $group:{
              _id:{
                
                  $add:[
                    
                      {
                          $dayOfYear:"$createdAt"
                      },
                      {
                          $multiply:[400,{$year:"$createdAt"}]
                      },
                      
                  ],
                  
              },
              totalPrice:{$sum:"$totalPrice"},
              first:{$min:"$createdAt"},

          }
    
      },
      {$addFields:{date:"$first"}},
      {$project:{first:0}},
    ])
  res.status(200).json(data)
  } catch (error) {
   throw error
  }
  }
  const GetWeeklySales=async(req,res)=>{
    let user= req.user;
    let userId= user.userId
  try {
  
    const data= await Sales.aggregate([
        {$match:{"createdBy":userId}},
      {
          $group:{
              _id:{
                  $add:[
                      {
                          $week:"$createdAt"
                      },
                      {
                          $multiply:[400,{$year:"$createdAt"}]
                      }
                  ]
              },
              totalPrice:{$sum:"$totalPrice"},
              first:{$min:"$createdAt"}
          }
        
      },
      {$addFields:{date:"$first"}},
      {$project:{first:0}},
    ])
  res.status(200).json(data)
  } catch (error) {
   throw error
  }
  }
  const GetMonthlySales=async(req,res)=>{
    let user= req.user;
        let userId= user.userId
  try {
   
    const data= await Sales.aggregate([
        {$match:{"createdBy":userId}},
      {
          $group:{
              _id:{
                  $add:[
                      {
                          $month:"$createdAt"
                      },
                      {
                          $multiply:[400,{$year:"$createdAt"}]
                      }
                  ]
              },
              totalPrice:{$sum:"$totalPrice"},
              first:{$min:"$createdAt"}
          }
   
      },
      {$addFields:{date:"$first"}},
      {$project:{first:0}},
    ])
  res.status(200).json(data)
  } catch (error) {
   throw error
  }
  }
  const GetYearlySales=async(req,res)=>{
    
     
  try {
    let user= req.user;
        let userId= user.userId
    const data= await Sales.aggregate([
        {$match:{"createdBy":userId}},
      {
          $group:{
              _id:{
                  $add:[
                      {
                          $year:"$createdAt"
                      },
                      {
                          $multiply:[400,{$year:"$createdAt"}]
                      }
                  ]
              },
              totalPrice:{$sum:"$totalPrice"},
              first:{$min:"$createdAt"}
          }
        
      },
      {$addFields:{date:"$first"}},
      {$project:{first:0}},
    ])
  res.status(200).json(data)
  } catch (error) {
   throw error
  }
  }
  const CumulativeSales=async(req,res)=>{
      try {
        let user= req.user;
        let userId= user.userId
          const data= await Sales.aggregate([
            {$match:{"createdBy":userId}}
            ,
              {
                  $setWindowFields:{
                      partitionBy:{
                          $year: "$createdAt"
                      },
                      sortBy:{
                          createdAt:1
                      },
                      output:{
                          cumulativeQuantityForYear:{
                              $sum:"$totalPrice",
                              window:{
                                  documents:["unbounded","current"]
                              }
                          },
                          maximuQuantityForYear:{
                              $max:"$totalPrice",
                              window:{
                                  documents:["unbounded","unbounded"]
                              }
                          }
                      }
                  }
              }
          ])
          res.status(200).json(data)
      } catch (error) {
          res.status(500).json({msg:"server error"})
      }
    
  }


module.exports={createSale,updateSale,getStoreKeeperSales,deleteSale,getSale,getShopSales,GetDailySales,GetWeeklySales,GetMonthlySales,CumulativeSales,GetYearlySales};
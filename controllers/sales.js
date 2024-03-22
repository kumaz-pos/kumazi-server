const Sales= require('../models/Sales');

const Product=require("../models/Products")
const createSale=async(req,res)=>{
   
    let user= req.user;
 
 let {items,paymentMethod,totalPrice,createdBy,currency,owner,name}=req.body
    try {
   
  
      
        const sale=await Sales.create({
           items,
           paymentMethod,
           
            totalPrice,
            
            createdBy,
            currency,
            owner,
            name
           

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
   


  

}



const getStoreKeeperSales=async(req,res)=>{
 
 
  
  let storekeeperId= req.params.id
    try {
   
     
        const data= await  Sales.find({createdBy:storekeeperId}).sort({_id:-1});
        
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
  
   let id= req.params.id
    try {
        
      
        const data= await  Sales.find({createdBy:id}).sort({_id:-1}).lean() ;
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
      const data=await Sales.findById(req.params.id).lean()
   
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
    let data= await Sales.aggregate([
        {
            "$group":{
            "_id":{
                "$add":[
                    {"$subtract":[
                    {"$subtract":["$createdAt",new Date(0)]},
                    {
                        "$mod":[
                        {"$subtract":["$createdAt",new Date(0)]},
                        ]
                    }
                    , 
                    new Date(0)
                    ]}
                ]
            },
            "week":{"$first":{"$week":"$createdAt"}},
            "month":{"$first":{"$month":"$createdAt"}},
            "total":{"$sum":"$num"}
            }
        },
        {
            "$group":{
                "_id":"$week",
                "month":{"$first":"month"},
                "days":{
                    "$push":{
                        "day":"_id",
                        "total":"$total"
                    }
                },
                "total":{"$sum":"$total"}
            }
        },
        {
            "$group":{
                "_id":"$month",
                "$weeks":{
                    "$push":{
                        "week":"$_id",
                        "total":"$total",
                        "days":"$days"
                    }
                },
                "total":{"$sum":"$total"}
            }
        }
    ])

  /*
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
    */
    if (!data) {
        res.status(200).json([])
    }else{
        res.status(200).json(data)
    }
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
    if (!data) {
        res.status(200).json([])
    }else{
        res.status(200).json(data)
    }
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
    if (!data) {
        res.status(200).json([])
    }else{
        res.status(200).json(data)
    }

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
    if (!data) {
        res.status(200).json([])
    }else{
        res.status(200).json(data)
    }
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
          if (!data) {
            res.status(200).json([])
        }else{
            res.status(200).json(data)
        }
      } catch (error) {
          res.status(500).json({msg:"server error"})
      }
    
  }


module.exports={createSale,updateSale,getStoreKeeperSales,deleteSale,getSale,getShopSales,GetDailySales,GetWeeklySales,GetMonthlySales,CumulativeSales,GetYearlySales};
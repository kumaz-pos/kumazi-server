const Events=require('../models/events')


const createEvent=async(req,res)=>{
    try {
        const event= await Events.create({
            name:req.body.name,
            photo:req.body.photo,
           fee:req.body.fee,
           description:req.body.description,
           venue:req.body.venue,
           province:req.body.province,
           surbub:req.body.surbub,
           address:req.body.address,
           contact:req.body.contact,
    
        });
        res.status(201).json({message:'event created succesfully',event})
    } catch (error) {
        res.send(error)
    }
  
}

const getEvents=async(req,res)=>{
    try {
        const allEvents=await Events.find();
res.status(200).send(allEvents)
    } catch (error) {
        res.send(error)
    }

}
const getEvent=async(req,res)=>{
    try {
        const id= req.params.id;
        const event= await Events.findById(id);
        if (!event) {
            res.status(500).json({message:'Event has not been found'})
        }
        res.status(200).json({message:'Event has been found',event})
    } catch (error) {
        res.send(error)
    }
  
}
const deleteEvent=async(req,res)=>{
   
    try {
        const id= req.params.id;
        const event= await Events.findByIdAndDelete(id);
        res.status(200).send()
    } catch (error) {
        res.send(error)
    }
}
const editEvent=async(req,res)=>{
    try {
        const id= req.params.id;
        const event= await Events.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(201).json({message:'event edited succesfully',event});
    } catch (error) {
        res.status(200).send(error)
    }
 
}


module.exports={
    getEvents,getEvent,deleteEvent,editEvent,createEvent
}
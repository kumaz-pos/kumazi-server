const mongoose= require('mongoose');

const EventSchema=new mongoose.Schema({
name:{
    type:String,
    required:true

},
photo:{
    type:String,

},
fee:{
    type:Number,
    required:true
},
description:{
    type:String,
    required:true,
    minlength:5
},
venue:{
    type:String,
    required:true
},
province:{
    type:String,
    required:true
},
surbub:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
contact:{
    type:String,
    required:true
}
})

const Event= mongoose.model('event',EventSchema);

module.exports=Event;
const mongoose= require('mongoose');
const BranchSchema= new mongoose.Schema({
branchName:{
    type:String,
    required:true
},
    
   owner:{
    type:mongoose.Types.ObjectId,
    ref:"UserSchema"
    },
    storeKeeper:{
        type:String,
        required:true
    }
 
}
,{
    timestamps:true
}
)



        const Branch= mongoose.model("Branch",BranchSchema);

        module.exports=Branch;
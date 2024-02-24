

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    Title:{
        type:String,
        required:true,
    },
    Discription:{
        type:String,
        required:true,   
    },
    Due_Date:{
        type:Date,
        required:true
    },
    Status:{
        type:String,
        required:true
    }
    
    
   
})

const Task1_Schema= mongoose.model('Task1',userSchema)

module.exports=Task1_Schema;
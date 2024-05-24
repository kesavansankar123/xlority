

const { number } = require('@hapi/joi');
const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,   
    },
    Phone_No:{
        type:Number,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Address:{
        type:String,
        required:true
    }
    
    
    
    
   
})

const Task_Schema= mongoose.model('Task',userSchema)

module.exports=Task_Schema;
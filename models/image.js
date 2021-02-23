const { json } = require('express');
const mongoose=require('mongoose');
const Todoschema=new mongoose.Schema({
    
    image:{
        type:String,
        required:true,
    }
});

module.exports=new mongoose.model("Image",Todoschema);
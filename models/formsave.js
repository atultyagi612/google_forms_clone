const { json } = require('express');
const mongoose=require('mongoose');
const Todoschema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:true,
    },
    form_data:{
        type:String,
        required:true,
    },
    isQuiz:{
        type:String,
        required:true,
    },
    release_Grade:{
        type:String,
        required:true,
    },
    conformation_message:{
        type:String,
        required:false,
    },
    response_reciept:{
        type:String,
        required:true,
    },
    limit:{
        type:String,
        required:true,
    },
    background_color:{
        type:String,
        required:true,
    },
    foreground_color:{
        type:String,
        required:true,
    },
    themeImage:{
        type:String,
        required:false,
    },
    mainImage:{
        type:String,
        required:false,
    },
    time : 
    { type: Number, 
      default: new Date()
    } 
    

});

module.exports=new mongoose.model("form_data",Todoschema);
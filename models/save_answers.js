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
    form_id:{
        type:String,
        required:true,
    },
    correct_answer:{
        type:String,
        required:true,
    },

    Answers:{
        type:String,
        required:true,
    },
    Marks:{
        type:String,
        required:false,
    },
    time : 
    { type: Number, 
      default: new Date()
    } 
    

});

module.exports=new mongoose.model("save_answer",Todoschema);
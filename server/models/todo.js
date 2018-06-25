var mongoose=require('mongoose');
var Todo=mongoose.model('Todo',{
  text:{
    type:String,
    required:true

  },
  completed:{
    type:Boolean
  },
  completedAT:{
    type:Number
  }
});
module.exports={Todo};

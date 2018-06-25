const _=require('lodash');
var express=require('express');
var bodyParser=require('body-parser');
var {mongoose}=require('./db/mongoose');
var {ObjectID}=require('mongodb');

var {User}=require('./models/user');
var {Todo}=require('./models/todo');

var  app=express();
const port=process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo=new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});


app.get('/todos/:id',(req,res)=>{
   var id=req.params.id;
   if(!ObjectID.isValid(id)){
     return res.status(404).send();
     console.log('this is wrong');
   }

   Todo.findById(id).then((todo)=>{
     if(!todo){
       console.log('this is empty');

       return res.status(404).send();

     }
     res.send({todo});
   }).catch((e)=>{
     res.status(400).send();
   });
});

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(400).send();
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});




app.listen(port,()=>{
  console.log("server has been started");
});

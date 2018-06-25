var mongoose =require('mongoose');
mongoose.Promise= global.Promise;
 // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
 mongoose.connect('mongodb://root:root123@ds117681.mlab.com:17681/todo' || 'mongodb://localhost:27017/TodoApp');

module.exports={mongoose};

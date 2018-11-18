var mongoose=require('mongoose');
//引入表结构对象
var artSchema=require('../schemas/artShema');
//创建一个可以操作表结构的数据模型对象
var artModel=mongoose.model('artModel',artSchema);
module.exports=artModel;
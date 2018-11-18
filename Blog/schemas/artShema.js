//引入mongoose
var mongoose=require('mongoose');
//创建表对象
var Schema=mongoose.Schema;
var artSchema=new Schema({//基于表对象实例化一个具体的表结构对象
    title:String,
    author:String,
    intro:String,
    time:String,
    words:String,
    imgSrc:String
})

//抛出表结构对象
module.exports=artSchema;
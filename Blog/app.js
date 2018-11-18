//引入配置文件
var express=require('express');
var swig=require('swig');
var mongoose=require('mongoose');
var artModel=require('./models/artModel');
var bodyParse=require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var app=express();
app.use(bodyParse.urlencoded({ extended: true }));// 配置body-parser中间件

// swig配置
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/views');

swig.setDefaults({cache:false});

//express框架自带方法，设置公用静态文件包
app.use('/pub',express.static(__dirname+'/public'));

//博客客户端接口
app.get('/',function(req,res){
    artModel.find().limit(6).then(function(result){
        res.render('blog',{
            result:result
        });
    })

})
//指定客户端留言端口，跳转至contact.html页面
app.get('/leavemsg',function(req,res){
    artModel.findById(req.query.pageId).then(function(result){
        res.render('contact',{
            detailD:result
                })
    })

})
//博客加载更多内容的接口
app.get('/load',function(req,res){
    var num=req.query.num;
    artModel.find().skip(6*num).limit(6).then(function(result){
        res.send(result);
    })
})
app.get('/list',function(req,res){
    res.sendFile(__dirname+'/views/list-index.html')
})

//指定浏览器端口，跳转至list-public页面
app.get('/list/publish',function(req,res){
    res.render('list-public');
})


app.post('/list/add',function(req,res){
    new artModel({
        title:req.body.title,
        author:req.body.author,
        intro:req.body.intro,
        time:req.body.time,
        words:req.body.words,
        imgSrc:req.body.imgSrc
    }).save().then(function(result){
        res.send('发布成功');
    })
})

//传递服务器内列表数据至list-index.html
app.get('/list/index',function(req,res){
    var pageArr=[];
    var pageNum;
    artModel.find().then(function(num){
        pageNum=Math.ceil(num.length/5);
        for(var i=1;i<=pageNum;i++){
            pageArr.push(i);
        }
    })
    artModel.find().limit(5).then(function(result){
        res.render('list-index',{
            listD:result,
            pageArr:pageArr
        });
    })

})
//删除列表接口
app.get('/list/del',function(req,res){
    artModel.deleteOne({_id:req.query.id}).then(function(result){
        res.send('删除成功');
    })
})
//文章编辑界面接口
app.get('/list/edit',function(req,res){
    artModel.findById(req.query.id).then(function(result){
        res.render('list-edit',result);
    })
})

//文章内容更新接口
app.post('/list/update',function(req,res){
    //修改数据库信息
    artModel.updateOne({_id:req.body.id},{
        title:req.body.title,
        author:req.body.author,
        intro:req.body.intro,
        time:req.body.time,
        words:req.body.words,
        imgSrc:req.body.imgSrc
    }).then(function(result){
        res.send('修改成功');
    })
})

//接收页码接口
app.get('/list/index/page',function(req,res){
    var skipNum = (req.query.num-1)*5
    artModel.find().skip(skipNum).limit(5).then(function(result){
        res.send(result);

    })
})
//图片接口
var fs=require('fs');
app.post('/upload', multipartMiddleware, function(req, res) {
    var fileData=req.files.file;
    var imgPath=fileData.path;
    var imgType=fileData.type.split('/')[1];
    fs.readFile(imgPath,function(err,result){
        var newPath='/public/image/'+new Date().getTime()+'.'+imgType;
        fs.writeFile(__dirname+newPath,result,function(error){
            if(!error){
                var nowPath=newPath.split('public').join('pub');
                res.send(nowPath);
            }
        })
    })
    // res.send(req.files);
});
mongoose.connect('mongodb://localhost:27018',{useNewUrlParser:true},function(err){
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
})

app.listen(8081);
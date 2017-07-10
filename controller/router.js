var formidable = require("formidable");
var sd = require("silly-datetime");
var db=require('../model/db.js');
var args={page:0,size:10,sort:{'time':-1}};
exports.showIndex=function(req,res){
    db.find('student',{},args,function(err,docs){
       // console.log(docs);
        res.render('message',{'docs':docs});
    });
};
exports.getData=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        if (err) {
            throw err;
        }else if(fields.name==''||fields.message==''){

           exports.showIndex(req,res);
        }else{
        //console.log(fields);
        var time = sd.format(new Date(),'YYYY/MM/DD HH:mm:ss');
        fieldsAll={"name":fields.name,"messags":fields.message,"time":time};
        //console.log(fieldsAll);
        db.insertOne('student',fieldsAll,function(){});
        db.find('student',{},args,function(err,docs){
            //console.log(docs);
            res.render('message',{'docs':docs});
        });
        }
    });
}
exports.delete=function(req,res){
    var id=req.url.substr(1);
    var ObjectID = require('mongodb').ObjectID;
    db.deleteMany('student',{_id:ObjectID(id)},function(err,result){
        //console.log(id);
    });
    res.redirect('/');
}
var express=require('express');
var app=express();
var router=require('./controller');
var ejs=require('ejs');
app.set('view engine','ejs');
app.use(express.static('./public'));
app.get('/favicon.ico',function(req,res){
    return;
});
app.get('/',router.showIndex);
app.post('/',router.getData);
app.get('/:id',router.delete);
/*app.get('/:wenjjname',router.showPhotos);
app.get('/up',router.up);
app.post('/up',router.doup);
app.use(function(req,res){
    res.render('err');
});*/
app.listen(3000);
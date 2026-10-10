
const express=require('express');

const router=express.Router();


const path=require('path')



let user;

router.get('/admin/add-user',(req,res,next)=>{
    console.log('inside middleware 2');
    res.send('<form class="form" action="/users" method="POST"><input type="text" placeholder="Enter Item" name="title" id="title" required></div>');
})

router.post('/users',(req,res,next)=>{
    user=req.body;
    console.log(user);
    res.redirect('/users')
    
})

router.get('/users',(req,res,next)=>{
    
   //res.sendFile(path.join(__dirname,'../','views','test4_user.html'))
   res.render('test4_user',{
    username:user.title
   })
})

router.get('/',(req,res,next)=>{
    console.log('inside middleware 1');
    //res.send(`<h1>HOME</h1><h3>${user.title}</h3>`)
    //res.sendFile(path.join(__dirname,'../','views','test4_home.html'))
    res.render('test4_home')
});

module.exports=router;
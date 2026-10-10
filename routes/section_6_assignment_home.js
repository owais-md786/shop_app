

const express=require('express');

const router=express.Router();


let users=[];

router.post('/new-user',(req,res,next)=>{
    users.push({name:req.body.name});
    res.redirect('/users');
})


exports.route=router;
exports.users=users;
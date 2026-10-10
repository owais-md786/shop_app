
const express=require('express');

const route=express.Router();

const {users}=require('./section_6_assignment_home')


route.get('/',(req,res,next)=>{
    res.render('section_6_assignment_userInput',{pageTitle:'Home'});
})


route.get('/users',(req,res,next)=>{
    console.log(users);
    const user=users;
    res.render('section_6_assignment_userShow',{allUser:user,pageTitle:'Users'});
})


exports.route=route;
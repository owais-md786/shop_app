const express=require('express');
const router=express.Router();

const path=require('path');


router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','section_4_assignment_2_home.html'))
});

module.exports=router;
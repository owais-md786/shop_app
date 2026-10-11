const nodemailer = require('nodemailer');

// require('dotenv').config();

// const {Resend}=require('resend');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'owaisind2005@gmail.com',
        pass: 'nczrjcdmcvyaqquk'
    }
})

module.exports.transporter=transporter;

// const resend=new Resend(process.env.RESEND_API_KEY)

// const sendEmail=async(to,from,subject,htmlContent) =>{
//     const {data,error}=await resend.emails.send({
//         from: from,
//         to: to,
//         subject: subject,
//         html:htmlContent
//     });

//     if(error){
//         console.log(error);
//         const err=new Error(error);
//         throw err;
//     }

//     console.log(data);
// }

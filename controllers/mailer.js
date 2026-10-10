const nodemailer = require('nodemailer');

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
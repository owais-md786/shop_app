const User = require('../models/user')

const jwt=require('jsonwebtoken');

const Admin = require('../models/admin')
// const mongodb = require('mongodb');
// const getdb = require('../util/databaseMongoDB').getdb;
const mongoose = require('mongoose');

const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')

const crypto = require('crypto')

const transporter = require('./mailer').transporter;




exports.getLoginPage = (req, res, next) => {
    /*  console.log('this is my COOKIE',req.get('Cookie'));
     const loggedIn=req.get('Cookie').trim().split('=')[1];
     console.log(loggedIn); */

    console.log('checking loggin', req.session.isLoggedIn);

    /* console.log('flash', req.flash('error')); */ // dont execute this because it will used here then message will not have anything

    let message = req.flash('error');
    //console.log('what msg1', message);
    if (message.length > 0) {
        message = message[0];
        //console.log('what msg000', message);
    }
    else {
        message = null;
    }
    //console.log('what msg2', message);

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message,
        oldInput:{
            email:'',
            password:'',
           
        },
        validationArray:[]

    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.myemail;
    const password = req.body.mypassword;

    const errors=validationResult(req);
    console.log('this is errors.array()  ',errors.array());
    if(!errors.isEmpty()){
        return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        oldInput:{
            email,password
        },
        validationArray:errors.array()

    })
    }
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('user not found!!');
                req.flash('error', 'Invalid email or password!')
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log('logged in successfully');
                        console.log('i am inside session');
                        req.session.isLoggedInAdmin = false;
                        req.session.isLoggedInUser = true;
                        //req.user=new User(result.username,result.email,result.phoneNumber,result.address,result.cart,result._id);
                        req.session.myUser = user;
                        console.log('this is session user', req.session.myUser);



                        const token=jwt.sign({
                            email:email,
                            userId:user._id
                        },'mysecretismysecret',{expiresIn:'1h'}
                    );
                    console.log('jwt token',token);




                        return req.session.save((err) => { //it can happen sometimes that on successful loggedin, still the cart and order menus are not visible because the redirect is done faster that the req.session is stored or saved to database and res.redirect is itself a request so session middleware may not find the req.session stored for that request but on refresh it will be visible.. so overcome that req.session.save()  it first does save the req.session to database then inside callback execute res.redirect which means as the req.session is saved to database then only call redirect.
                            console.log(err);
                            res.redirect('/');

                        })

                    }
                    console.log('password not correct');
                    req.flash('error', 'Invalid email or password!')
                    return res.redirect('/login')
                })
                .catch(err => {
                    console.log(err);
                })

        }).catch(err => {
            console.log(err);
        })
}


exports.getSignup = (req, res, next) => {
    let message = req.flash('sign-error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
        oldInput:{email:'',phoneNumber:'',name:'',state:'', city:'', zipcode:'' ,area:'' ,street:'' ,addType:'' ,flat:'', password:'' ,confirmPassword:''},
        validationArray:[]
    })
}


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        console.log('loggedout');
        res.redirect('/login')
    })
}


exports.postSignup = (req, res, next) => {
    const email = req.body.myemail;
    const phoneNumber = req.body.myphone;
    const name = req.body.myusername;
    const state = req.body.mystate;
    const city = req.body.mycity;
    const zipcode = req.body.myzipcode;
    const area = req.body.myarea;
    const street = req.body.mystreet;
    const addType = req.body.myaddtype;
    const flat = req.body.myflat;
    const password = req.body.mypassword;
    const confirmPassword = req.body.myconfirmpassword;

    const address = {
        state: state,
        city: city,
        zipcode: zipcode,
        area: area,
        street: street,
        addType: addType,
        flatApart: flat
    }
    const cart = {
        items: []
    };

    const errors=validationResult(req);
    console.log('this is validatorError',errors.array());
    if(!errors.isEmpty()){
        return res.status(422).render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput:{email,phoneNumber,name,state, city, zipcode ,area ,street ,addType ,flat, password ,confirmPassword},
        validationArray:errors.array()
    })
    }


    // User.findOne({ email: email })
    //     .then(userdoc => {
    //         if (userdoc) {
    //             req.flash('sign-error', 'User with this email or username already exists !')
    //             return res.redirect('/signup');

    //         }
             bcrypt.hash(password, 12)
                .then(hashedPassword => {


                    const user = new User({
                        name: name,
                        email: email,
                        cart: cart,
                        password: hashedPassword,
                        address: address,
                        phoneNumber: phoneNumber
                    });
                    return user.save()
                })
                .then(result => {
                    res.redirect('/login');
                    return transporter.sendMail({
                        to: email,
                        from: '"Node Shop App" <owaisind2005@gmail.com>',
                        subject: 'Signup Successful',
                        html: '<h1>You have successfully signed up!</h1>'
                    })
                })
                .catch(err => {
                    console.log(err);
                })
    


}


exports.getreset = (req, res, next) => {
    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        path: '/reset',
        errorMessage: null
    })
}


exports.postreset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.myemail })
            .then(user => {
                if (!user) {

                   throw new Error('No user with that email found')
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 600000;
                return user.save()
            })
            .then(result => {
                res.redirect('/login')
                transporter.sendMail({
                    to: req.body.myemail,
                    from: '"Node Shop App" <owaisind2005@gmail.com>',
                    subject: 'Password Reset Link',
                    html: `
                    <p>You requested a password reset for your account ${req.body.myemail}</p>
                    <p> Click this <a href = "https://shop-app-jl6a.onrender.com/reset-password/${token}">link</a> to set a new password</p>    
                    `
                })
            })
            .catch(err=>{
                console.log(err);
                if(err.message==='No user with that email found'){

                    return res.redirect('/reset-password')
                }
                const error=new Error(err);
                error.statusCode=403;
                next(error)
            })
    })
}


exports.getNewPass = (req, res, next) => {

    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
            console.log('first check', user);
            if (!user) {
                return res.redirect('/reset-password')
            }
            res.render('auth/pass-chnge', {
                pageTitle: 'Change Password',
                path: '/new-password',
                errorMessage: null,
                userId: user._id.toString(),
                passwordToken: token
            })

        })
        .catch(err => {
            console.log(err)
            next(err)
        })
}

exports.postNewPass = (req, res, next) => {
    const userId = req.body.userId;
    const newpassword = req.body.mypassword;
    const token = req.body.passwordToken;

    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() }, _id: userId })
        .then(user => {
            console.log('this is password change', user)
            return bcrypt.hash(newpassword, 12)
                .then(hashedPassword => {
                    user.password = hashedPassword;
                    user.resetToken = undefined;
                    user.resetTokenExpiration = undefined;
                    return user.save()
                })
                .then(result => {
                    res.redirect('/login');
                    transporter.sendMail({
                        to: user.email,
                        from: '"Node Shop App" <owaisind2005@gmail.com>',
                        subject: 'Password Reset Successful',
                        html: `
                    <p>Password for account ${user.email} has been changed successfully</p>`
                    })
                })
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
}


exports.getAdminSignup = (req, res, next) => {
    let message = req.flash('sign-error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/admin-signup', {
        pageTitle: 'Admin Signup',
        path: '/admin/signup',
        errorMessage: null
    })
}


exports.postAdminSignup = (req, res, next) => {

    const email = req.body.myemail;
    const phoneNumber = req.body.myphone;
    const name = req.body.myusername;
    const password = req.body.mypassword;
    const confirmPassword = req.body.myconfirmpassword;


    const products = [];


    Admin.findOne({ email: email })
        .then(admindoc => {
            if (admindoc) {
                req.flash('sign-error', 'Admin with this email or username already exists !')
                return res.redirect('/admin/signup');

            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {


                    const admin = new Admin({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        products: products,
                        phoneNumber: phoneNumber
                    });
                    return admin.save()
                })
                .then(result => {
                    res.redirect('/admin/login');
                    return transporter.sendMail({
                        to: email,
                        from: '"Node Shop App" <owaisind2005@gmail.com>',
                        subject: 'ADMIN Signup Successful',
                        html: `
                        <h1>Congratulations!!</h1>
                        <h3>You have successfully signed up as an ADMIN of the APP!</h3>`
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        })

        .catch(err => {
            console.log(err)
        })


}


exports.getAdminLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/admin-login', {
        pageTitle: 'Admin Login',
        path: '/admin/login',
        errorMessage: null
    })
}

exports.postAdminLogin = (req, res, next) => {
    const email = req.body.myemail;
    const password = req.body.mypassword;
    Admin.findOne({ email: email })
        .then(admin => {
            if (!admin) {
                console.log('admin not found!!');
                req.flash('error', 'Invalid email or password!')
                return res.redirect('/admin/login');
            }
            bcrypt.compare(password, admin.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log('logged in successfully');
                        console.log('i am inside session');
                        req.session.isLoggedInAdmin = true;
                        req.session.isLoggedInUser = false;
                        //req.user=new User(result.username,result.email,result.phoneNumber,result.address,result.cart,result._id);
                        req.session.myAdmin = admin;
                        console.log('this is session user', req.session.myAdmin);
                        return req.session.save((err) => { //it can happen sometimes that on successful loggedin, still the cart and order menus are not visible because the redirect is done faster that the req.session is stored or saved to database and res.redirect is itself a request so session middleware may not find the req.session stored for that request but on refresh it will be visible.. so overcome that req.session.save()  it first does save the req.session to database then inside callback execute res.redirect which means as the req.session is saved to database then only call redirect.
                            console.log(err);
                            res.redirect('/admin/products');

                        })

                    }
                    console.log('password not correct');
                    req.flash('error', 'Invalid email or password!')
                    return res.redirect('/admin/login')
                })
                .catch(err => {
                    console.log(err);
                })

        }).catch(err => {
            console.log(err);
        })
}
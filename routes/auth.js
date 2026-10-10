const express = require('express');

const router = express.Router();

const { check, body } = require('express-validator')

const User = require('../models/user')

const isAuth = require('../middleware/is-auth')

const authRouter = require('../controllers/auth')


router.get('/login', isAuth.forFreeUser, isAuth.forFree, authRouter.getLoginPage)
router.post('/login',
        check('myemail').isEmail().withMessage('Please enter a valid email').trim(),
    authRouter.postLogin);

router.post('/logout', authRouter.postLogout)
router.get('/signup', isAuth.forFree, isAuth.forFreeUser, authRouter.getSignup)
router.post('/signup',
    [
        check('myemail').isEmail().withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({ email: value })
                    .then(userdoc => {
                        if (userdoc) {
                            return Promise.reject('User with this email already exists !')

                        }
                    })
            })
            .trim(),
        body('mypassword').isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1
        })
            .withMessage('Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character'),
        body('myconfirmpassword')
            .custom((value, { req }) => {
                if (value !== req.body.mypassword) {
                    throw new Error('Password must match!')
                }
                return true;
            })
    ],
    authRouter.postSignup);

router.get('/reset-password', isAuth.forFree, isAuth.forFreeUser, authRouter.getreset)
router.post('/reset-password', authRouter.postreset)
router.get('/reset-password/:token', isAuth.forFreeUser, isAuth.forFree, authRouter.getNewPass)
router.post('/new-password', authRouter.postNewPass)
router.get('/admin/signup', isAuth.forFree, isAuth.forFreeUser, authRouter.getAdminSignup)
router.post('/admin/signup', authRouter.postAdminSignup)
router.get('/admin/login', isAuth.forFree, isAuth.forFreeUser, authRouter.getAdminLogin)
router.post('/admin/login', authRouter.postAdminLogin)


module.exports = router;
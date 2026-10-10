require('dotenv').config();

const http = require('http');

// const https=require('https')


const express = require('express');


const app = express();


/* app.use((req,res,next)=>{
    console.log('In the middleware!');
 
    next();
});  */

/* app.use('/',(req,res,next)=>{
    console.log('This ALWAYS runs!');
   // console.log('URL :' ,req.url);
    next();
})

app.use('/person',(req,res,next)=>{
    console.log('i am person');
    res.send('<h1>I am the person</h1>')
})

app.use('/users',(req,res,next)=>{
    console.log('i am user'); 
    res.send('<h1>I am the USERS</h1>')
})

app.use('/',(req,res,next)=>{
    console.log('In another middleware!');
    res.send('<h1>Sending response to end request in Middleware</h1>')
}) */


//const {engine}=require('express-handlebars'); //for handlebars




//app.engine('hbs',engine()); //for handlebars
app.set('view engine', 'ejs'); //for ejs
//app.set('view engine','pug'); //for pug
app.set('views', './views')


const path = require('path');

const fs = require('fs')

const adminRoutes = require('./routes/admin');// importing router, this router is actually a valid middleware function
//adminRoutes refers to all exports (products and routes)


const userViewRoutes = require('./routes/user-view');// importing router, this router is actually a valid middleware function

const authRoutes = require('./routes/auth');

const error = require('./controllers/error');


//const mongoConnect = require('./util/databaseMongoDB').mongoConnect;

const mongoose = require('mongoose');


const User = require('./models/user');

const Admin = require('./models/admin')

const session = require('express-session')

const MongoDBStore = require('connect-mongodb-session')(session); // this function returns constructor function

const csrf = require('csurf');

const flash = require('connect-flash')

const multer = require('multer')

const helmet = require('helmet')

const compression = require('compression')

const morgan = require('morgan');


/* const sequelize=require('./util/databaseMYSQL');
const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-items');
const OrderItem=require('./models/order-items');
const Order=require('./models/order'); */


const bodyParser = require('body-parser');

const MONGODB_URI = process.env.MONGODB_URI;  //connection string

const store = new MongoDBStore({  //execute as mongodb constructor
    uri: MONGODB_URI,
    collection: process.env.MONGODB_SESSION_COLLECTION
});


// const privateKey=fs.readFileSync('server.key');
// const certificate=fs.readFileSync('server.cert')

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(morgan('combined',{stream:accessLogStream}))

app.use(helmet());

const csrfProtection = csrf();

app.use(compression());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {

        cb(null, true) // null for error and true if want to allow particular fileType
    } else {
        cb(null, false)
    }
};

app.use(bodyParser.urlencoded());
//app.use(express.urlencoded()); //--> new way to do so 

app.use(express.json())


app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, store: store,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite:'lax',
        maxAge: 3600000
    }
}))

app.use(csrfProtection)

app.use(flash());

let csrfTokenTest;

app.use((req, res, next) => {
    res.locals.isAuthenticatedAdmin = req.session.isLoggedInAdmin;
    res.locals.isAuthenticatedUser = req.session.isLoggedInUser;
    res.locals.csrfToken = req.csrfToken();
    next();
})


app.use((req, res, next) => {


    //    User.findById('6a9868dbfc6e6d41ec5ee380')
    //    .then(user =>{
    //     req.user = user;
    //     console.log('this is req.user', req.user);
    //     next();
    //    })
    //    .catch(err =>{
    //     console.log(err);
    //    })

    if (req.session.myUser) {
        User.findById(req.session.myUser._id)
            .then(result => {
                console.log(typeof result, 'this is user', result);
                //console.log(result instanceof User);
                //console.log(typeof result.createSequelizeproduct);

                req.user = result;
                console.log('this is session user mid', req.user); //result is not just JavaScript object that stores the database value, it is also the sequelize object, on which we can apply/use methods like (destroy(), save()), we are storing sequelize object to req.user
                return next();
            }).catch(err => {
                return next(new Error(err))
            })
    }
    else if (req.session.myAdmin) {
        Admin.findById(req.session.myAdmin._id)
            .then(result => {
                console.log(typeof result, 'this is admin', result);
                //console.log(result instanceof User);
                //console.log(typeof result.createSequelizeproduct);

                req.admin = result;
                console.log('this is session admin mid', req.admin); //result is not just JavaScript object that stores the database value, it is also the sequelize object, on which we can apply/use methods like (destroy(), save()), we are storing sequelize object to req.user
                return next();
            }).catch(err => {
                return next(new Error(err));
            })
    }
    else {
        return next();
    }
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
})





app.use(userViewRoutes);// this router is actually a valid middleware function, so passing it to app.use

app.use('/admin', adminRoutes.routes);// this router is actually a valid middleware function, so passing it to app.use

app.use(authRoutes);

//app.get('/500', error.error500)

app.use(error.error404);

app.use((error, req, res, next) => {
    console.log('this error', error);
    //res.status(500).render('500', { pageTitle: 'Internal Server Error' });
    res.status(error.statusCode).json({
        error: {
            errorMessage: error.message
        }
    })
})

/* Product.belongsTo(User,{constraint:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through : CartItem})
Product.belongsToMany(Cart,{through : CartItem})
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});





console.log('user',Object.keys(User.associations));   //ASSOCIATION ALIAS i.e. MODEL NAME
console.log('product',Object.keys(Product.associations));//ASSOCIATION ALIAS i.e. MODEL NAME



sequelize
//.sync({force:true})
.sync()
.then((res)=>{
   return User.findByPk(1);
    //console.log(res);
    
}).then(ans =>{
    //console.log('checking user',ans);
    if(ans.length <= 0){
        return User.create({name:'owais',email:'owaisdxb@gmail.com'})
    }
    return ans;
}).then(user =>{
    //console.log(user);
    Cart.findAll().then(ans =>{
        if(ans.length<=0){

            return user.createSequelizeCart();
        }
    })//.catch(err => console.log(err))
    return user;
    

}).then(res =>{
    app.listen(5100);

})
.catch(err =>{ 
    console.log(err);
}) */
console.log(process.env.PORT)

mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        // const server = https.createServer({
        //     key:privateKey,
        //     cert:certificate
        // },app).listen(process.env.PORT || 8080, () => {
        //     console.log(`connected to port ${process.env.PORT}`);
        // });

        const server = app.listen(process.env.PORT || 8080, () => {
            console.log(`connected to port ${process.env.PORT}`);
        });
        const io = require('./socketInitialize').init(server)
        io.on('connection', socket => {
            console.log('Client Connected')
        })
    })
    .catch(err => {

        console.log('error', err);


    })


/* const server=http.createServer(app);

server.listen(8080); */

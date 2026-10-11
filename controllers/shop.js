const Product = require('../models/product');
const Cart = require('../models/cart');

const Order = require('../models/order')

const db = require('../util/databaseMYSQL');
const User = require('../models/user');

//const mongodb = require('mongodb');
const { default: mongoose } = require('mongoose');
//const getdb = require('../util/databaseMongoDB').getdb;

const fs = require('fs')

const path = require('path')

const PDFDocument = require('pdfkit')


const currencyINR = require('../indian_currency_getter').india;


const transporter = require('./mailer').transporter;

const mailTemplate = require('../views/shop/mailTemplate').mailTemplate


const ITEMS_PER_PAGE = 10;


exports.getProducts = (req, res, next) => {
    /* const products = Product.fetchAll();
    console.log('products.js', products);

    products.then(([row, fieldData]) => {
        console.log('resolved');
        console.log(row);
        res.render('shop/product-list', { prodss: row, pageTitle: 'All Products', path: '/products' });
    })
        .catch((err) => {
            console.log(error);
            return;
        }) */


    // Product.fetchAll() //mongodb driver
    //     .then(products => {
    //         products.forEach(p => {
    //             p.price = currencyINR(p.price);
    //         })
    //         console.log('got it', products);
    //         res.render('shop/product-list', {
    //             prodss: products, pageTitle: 'All Products', path: '/products',
    //             isAuthenticated: req.session.isLoggedIn
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    let totalitems;
    const page = +req.query.page || 1;
    Product.countDocuments()
        .then(tot => {
            totalitems = tot;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            products.forEach(p => {
                p.formattedprice = currencyINR(p.price);

            })
            console.log('got it', products);
            res.render('shop/product-list', {
                prodss: products, pageTitle: 'All Products', path: '/products',
                currentPage: page,
                hasNextPage: page * ITEMS_PER_PAGE < totalitems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalitems / ITEMS_PER_PAGE)
                // isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })

    /* res.sendFile(path.join(__dirname,'..','views','shop.html')) */

};


exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId, typeof prodId);
    //const products = Product.fetchAll();
    /* return products.forEach((prod)=>{
        if(prod.id === prodId){
           res.render('shop/product-detail',{
        pageTitle:product.title,
        path:'/products',
        product:product
    });
            return;
        }
    }) */


    //const products = db.execute('SELECT * FROM products WHERE id = ?',[+prodId]) // is found return promise with the result as the element and if not found then return result as empty array
    //products.then(([row]) => {
    //console.log(row);
    /* const product = row.find(p => p.id == prodId) */ // if it is true, then 'p' (i.e, the single product ) is stored in product variable and if it is false then the product variable is undefined


    //console.log('Detail of', row);
    //if (/* !product */ row.length <= 0) {
    /*  res.status(404).render('404', {
         pageTitle: 'Page Not Found'
     })
     return;
 }
 res.render('shop/product-detail', {
     pageTitle: row[0].title.charAt(0).toUpperCase() + row[0].title.substring(1),
     path: '/products',
     product: row[0]
 });
})
.catch((err) => {
     console.log(err);
     res.send(err.message)
 }); */


    // Product.findOne(prodId) //mongodb driver
    //     .then(product => {
    //         console.log('it me from detail', product);
    //         res.render('shop/product-detail', {
    //             pageTitle: product.title.charAt(0).toUpperCase() + product.title.substring(1),
    //             path: '/products',
    //             product: product,
    //             isAuthenticated: req.session.isLoggedIn
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })


    Product.findById(prodId) //mongoose
        .then(product => {
            console.log('it me from detail', product);
            res.render('shop/product-detail', {
                pageTitle: product.title.charAt(0).toUpperCase() + product.title.substring(1),
                path: '/products',
                product: product,
                /* isAuthenticated: req.session.isLoggedIn */
                currencyINR
            });
        })
        .catch(err => {
            console.log(err);
        })





    /* Product.findByPk(+prodId)
    .then(product =>{
        console.log(product);
        res.render('shop/product-detail', {
        pageTitle: product.title.charAt(0).toUpperCase() + product.title.substring(1),
        path: '/products',
        product: product
    })
    }).catch(err =>{
        console.log(err);
    }) */




    /* res.status(404).render('404',{
        pageTitle:'Page Not Found'
    }) */
}


exports.getIndex = (req, res, next) => {
    /* const products = Product.fetchAll();
    console.log('index.js', products);

    products.then(([row, fieldData]) => {
        res.render('shop/index', { prodss: row, pageTitle: 'Shop', path: '/' });

    }).catch((err) => {
        console.log(err);
    }) */

    // Product.fetchAll()  //mongodb driver
    //     .then(products => {
    //         products.forEach(p => {
    //             p.price = currencyINR(p.price);
    //         })
    //         console.log('got it', products);
    //         res.render('shop/index', {
    //             prodss: products, pageTitle: 'Shop', path: '/',
    //             // isAuthenticated: req.session.isLoggedIn,
    //             // csrfToken:req.csrfToken()
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })


    let totalitems;
    const page = +req.query.page || 1;
    Product.countDocuments()
        .then(tot => {
            totalitems = tot;
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(products => {
            products.forEach(p => {
                p.formattedprice = currencyINR(p.price);

            })
            console.log('got it', products);
            res.render('shop/index', {
                prodss: products, pageTitle: 'Home', path: '/',
                currentPage: page,
                hasNextPage: page * ITEMS_PER_PAGE < totalitems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalitems / ITEMS_PER_PAGE)
                // isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })

    /* res.sendFile(path.join(__dirname,'..','views','shop.html')) */
}


exports.getCart = (req, res, next) => {
    /*  const totalcart = Cart.showTotalCart();
     const products = Cart.showCartProduct();
     console.log('your cart', products);
     res.render('shop/cart', {
         path: '/cart',
         pageTitle: 'Your Cart',
         product: products,
         totalCart: totalcart
     }) */

    let totalSum = 0;

    req.user.getCart()
        .then(product => {
            // product.forEach(p => {
            //     p.price = currencyINR(p.price);
            // })
            console.log('this is my cart from now', product);
            product.forEach(e => {
                totalSum += e.totalPrice;
            })
            console.log('total checkout', totalSum);
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                product: product,
                totalSum: currencyINR(totalSum),
                // isAuthenticated: req.session.isLoggedIn,
                currencyINR

            })
        })






    /* req.user.getSequelizeCart()
    .then(cart =>{
        return cart.getSequelizeproducts()
        
    })
    .then(products =>{
       
        //console.log('from cartt',products);
       // console.log(products[1].sequelizeCartItem);
        res.render('shop/cart', {
path: '/cart',
pageTitle: 'Your Cart',
product: products
})
        
    }).catch(err => console.log(err)) */

};

exports.postAddCartQuantity = (req, res, next) => {
    const prodId = req.body.productId;

    console.log('from add quantity', prodId, typeof prodId);

    // const db = getdb();
    // db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) })
    //     .then(product => {
    //         return req.user.addToCart(product);
    //     })
    //     .then(item => {
    //         console.log('from addQuantity', item);
    //         res.redirect('/cart');
    //     })



    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(item => {
            console.log('from addQuantity', item);
            //res.redirect('/cart');
            res.status(200).json({message:"cart quantity increased",product:item})
        })


}


exports.postMinusCartQuantity = (req, res, next) => {
    const prodId = req.body.productId;

    console.log('from minus quantity', prodId, typeof prodId);
    // const db = getdb();
    // db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) })
    //     .then(product => {
    //         return req.user.minusQuantity(product);
    //     })
    //     .then(item => {
    //         console.log('from minusQuantity', item);
    //         res.redirect('/cart');
    //     })


    Product.findById(prodId)
        .then(product => {
            return req.user.minusQuantity(product);
        })
        .then(item => {
            console.log('from minusQuantity', item);
           // res.redirect('/cart');
           res.status(200).json({
            message:"minus quantity successful",
            product:item
           })
        })

}


exports.postDeleteCart = (req, res, next) => {
    const prodId = req.body.productId;

    console.log('from delete cart', prodId, typeof prodId);
    //Cart.removePerCrossCart(prodId);

    /* req.user.getSequelizeCart()
    .then(cart =>{
        return cart.getSequelizeproducts({where :{id:+prodId}})
    })
    .then(products =>{
        let product=products[0];
        return product.sequelizeCartItem.destroy();
    })
    .then(()=>{

        res.redirect('/cart');
    })
    .catch(err => console.log(err)) */



    // const db = getdb();
    // db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) })
    //     .then((product) => {
    //         console.log('tell me tell', product);
    //         return req.user.deletePerCartItem(product)
    //     })
    //     .then(ans => {
    //         console.log(ans);
    //         res.redirect('/cart');
    //     })



    Product.findById(prodId)
        .then((product) => {
            console.log('tell me tell', product);
            return req.user.deletePerCartItem(product)
        })
        .then(ans => {
            console.log(ans);
            //res.redirect('/cart');
            res.status(200).json({
                message:"item deletion from cart successful",
                product:ans
            })
        })
        .catch(err =>{
            const error=new Error('deletion failed')
            error.statusCode=400;
            next(error);
        })



}

exports.postDeleteAllCart = (req, res, next) => {

    // req.user.deleteAll()
    //     .then(result => {
    //         console.log(result);
    //         res.redirect('/cart');
    //     })

    req.user.cart.items = [];
    req.user.save()
        .then(result => {
            console.log(result);
            // res.redirect('/cart');
            res.status(200).json({
                message:"all cart items deleted",
                success:true,
                cartHeader:'Cart Empty'
            })
        })


}



exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId, typeof prodId);



    // Product.findOne(prodId)  //mongodb driver
    //     .then(product => {
    //         console.log(product);
    //         return req.user.addToCart(product);
    //     }).then(result => {
    //         console.log(result);
    //         res.redirect('/products');
    //     })




    Product.findById(prodId)  //mongoose
        .then(product => {
            console.log(product);
            return req.user.addToCart(product);
        }).then(result => {
            console.log(result);
            //res.redirect('/products');
            res.status(200).json({message:"product added to cart"})
        })







    /* let fetchedCart;
    //Cart.addProduct(+prodId)
     req.user.getSequelizeCart()
     .then(cart => {
        fetchedCart=cart;
       return cart.getSequelizeproducts({where :{id:+prodId}})
     })
     .then(products =>{
        let product;
        if(products.length>0){

            product = products[0];
        }
        let newQuantity=1;
        if(product)
        {
            //console.log('gefee',product);
            let oldQuantity=product.sequelizeCartItem.quantity;
            newQuantity=oldQuantity+1;
            //console.log('myQuan',oldQuantity);
            return fetchedCart.addSequelizeproduct(product,{
                through:{ quantity:newQuantity}
            })
            .then(()=>{
                res.redirect('/products');
            })
            .catch(err => console.log(err))
            
        }
        return Product.findByPk(+prodId)
        .then(product => {
            return fetchedCart.addSequelizeproduct(product,{
                through:{ quantity:newQuantity}
            })
        })
        .then(()=>{

            res.redirect('/products');
        })
        .catch(err => console.log(err))
     })
     .catch(err => console.log(err)) */

};

exports.orderSummary = (req, res, next) => {
    let totalSum = 0;
    let quanPrice;
    let discount = 100;
    req.user.getCart()
        .then(product => {
            // product.forEach(p => {
            //     p.price = currencyINR(p.price);
            // })
            console.log('this is my order summary', product);
            product.forEach(e => {
                totalSum += e.totalPrice;
            })

            console.log('total checkout', totalSum);
            res.render('shop/checkout', {
                path: '/buy-cart',
                pageTitle: 'Order Summary',
                product: product,
                user: req.user,
                totalSum: currencyINR(totalSum),
                normalSum: currencyINR((totalSum - discount) + 99),
                discount,
                //isAuthenticated: req.session.isLoggedIn
                currencyINR


            })
        })
}


exports.postaddOrder = (req, res, next) => {
    const mydate = new Date();
    const date = mydate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
    let orderid;
    req.user.addOrder()
        .then(ans => {
            console.log('test me', ans, typeof ans);
            if (ans.type === 'null') {
                res.render('shop/alreadyPlaced', {

                    // isAuthenticated: req.session.isLoggedIn
                })
            }
            else {

                orderid = ans.orderId.toString();



                res.render('shop/orderconfirm', {
                    date,
                    orderId: ans.orderId.toString(),
                    // isAuthenticated: req.session.isLoggedIn
                })

                return transporter.sendMail({
                    to: req.user.email,
                    from: '"Node Shop App" <owaisind2005@gmail.com>',
                    subject: 'Order Placed Successfully',
                    html: '<h1>Your Order has been placed successfully. Delivery expected within 7-10 days</h1>'
                    //  mailTemplate
                    // .replace('{orderid}',orderid)
                })

            }

        })
        .catch(err => {
            console.log(err);
        })
        .catch(err => {
            console.log(err);
        })
}


/* exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pagetTitle: 'Checkout'
    })
} */


exports.getOrderDetail = (req, res, next) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    console.log('orderID', orderId, typeof orderId);


    // db.collection('orders').findOne({ _id: new mongodb.ObjectId(orderId) })
    Order.findById(orderId)
        .then(result => {
            console.log('got order', result.items);
            const userDetail = result.user;

            const final = result.items.filter(p => {
                return p.product._id.toString() === productId;
            })
            console.log('best day bro', final);
            console.log('this is from orderUSER', userDetail)
            return { final, userDetail };
        })
        .then(prod => {

            res.render('shop/order-details', {
                pageTitle: 'Order Detail',
                orderId,
                product: prod.final[0],
                user: prod.userDetail,
                //isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => {
            console.log('from order-details', err)
        })

}

exports.getOrders = (req, res, next) => {

    // mongodb driver

    // let allOrders = [];
    // let finalArray;

    // const db = getdb();
    // db.collection('orders').find({ 'user.userId': req.user._id }).toArray()
    //     .then(result => {
    //         console.log('this is all orders', result);
    //         for (let i = 0; i < result.length; i++) {
    //             console.log('this is items of order', result[i].items);
    //             let withIdArray = result[i].items.map(f => {

    //                 return {
    //                     ...f,
    //                     orderId: result[i]._id
    //                 }
    //             })
    //             console.log('this is items of order 222', withIdArray);
    //             allOrders.push(withIdArray)
    //         }
    //         console.log('wohooo', allOrders);
    //         // console.log('wohoooagain',allOrders.flat());
    //         finalArray = allOrders.flat();
    //         console.log('tadatadatad', finalArray);
    //         return finalArray;

    //     })
    //     .then(data => {
    //         console.log('tadatadatad i data', data);
    //         res.render('shop/orders', {
    //             path: '/orders',
    //             pageTitle: 'Orders',
    //             products: finalArray,
    //             isAuthenticated: req.session.isLoggedIn
    //         })
    //     })


    // mongoose

    let allOrders = [];
    let finalArray;


    //db.collection('orders').find({ 'user.userId': req.user._id }).toArray()
    console.log('user from getorders', req.user);
    Order.find({ 'user.userId': req.user._id })
        .then(result => {
            console.log('this is all orders', result);
            
            
            for (let i = 0; i < result.length; i++) {
                console.log('this is items of order', result[i].items);
                let withIdArray = result[i].items.map(f => {

                    return {
                        ...f,
                        orderId: result[i]._id
                    }
                })
                console.log('this is items of order 222', withIdArray);
                allOrders.push(withIdArray)
            }
            console.log('wohooo', allOrders);

            // console.log('wohoooagain',allOrders.flat());
            finalArray = allOrders.flat();
            console.log('tadatadatad', finalArray);
            // console.log('tadatadatad see _doc', finalArray[0]._doc.product);


            return finalArray;

        })
        .then(data => {
            console.log('tadatadatad i data', data);
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Orders',
                products: finalArray,
                // isAuthenticated: req.session.isLoggedIn
            })
        })
}

exports.getInvoice = (req, res, next) => {
    //    console.log('running');
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {


            const invoiceName = 'invoice-' + orderId + '.pdf';
            const invoicePath = path.join(__dirname, '../', 'data', 'invoices', invoiceName);
            // fs.readFile(invoicePath,(err,data)=>{
            //     if(err){
            //         console.log(err);
            //         return next(err)
            //     }
            //     res.setHeader('Content-Type','application/pdf');
            //     res.setHeader('Content-Disposition','inline; filename="'+invoiceName+'"')
            //     res.send(data)
            // })

            // const file = fs.createReadStream(invoicePath);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
            // file.pipe(res);

            const pdfDoc = new PDFDocument({
                size: 'A4',
                margin: 50
            });

            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
            pdfDoc.pipe(res);



            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .fontSize(28)
                .text('INVOICE', 50, 50);

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .fillColor('#555555')
                .text('Invoice:', 400, 55);
            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(9)
                .fillColor('#555555')
                .text('#I' + orderId, 400, 70);


            // ----------------------------------------------------
            // CLIENT INFORMATION
            // ----------------------------------------------------

            pdfDoc
                .fillColor('#000000')
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .fontSize(11)
                .text('Node Shop App', 50, 105);

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .fillColor('#555555')
                .text('owaisind2005@gmail.com', 50, 123);


            // ----------------------------------------------------
            // BILL TO
            // ----------------------------------------------------

            pdfDoc
                .fillColor('#000000')
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .fontSize(10)
                .text('BILL TO:', 50, 165);

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .text(order.user.name, 50, 182)
                .text(order.user.email, 50, 198)
                .text(
                    order.user.address.flatApart + ',' +
                    order.user.address.street + ',' +
                    order.user.address.area,
                    50,
                    214
                )
                .text(
                    order.user.address.city + ',' +
                    order.user.address.zipcode + ',' +
                    order.user.address.state,
                    50,
                    230
                );


            // ----------------------------------------------------
            // DATE / DUE DATE
            // ----------------------------------------------------

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .text('Date:', 400, 165);

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .text(order.items[0].product.orderDate.toLocaleString('en-IN', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                }), 400, 181);




            // ----------------------------------------------------
            // TABLE HEADER
            // ----------------------------------------------------

            const tableTop = 280;

            const colNo = 50;
            const colDescription = 90;
            const colQuantity = 320;
            const colUnitPrice = 390;
            const colTotal = 485;

            pdfDoc
                .fillColor('#000000')
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .fontSize(10)
                .text('No.', colNo, tableTop)
                .text('Description', colDescription, tableTop)
                .text('Quantity', colQuantity, tableTop)
                .text('Unit Price', colUnitPrice, tableTop)
                .text('Total', colTotal, tableTop);


            // ----------------------------------------------------
            // TABLE LINE
            // ----------------------------------------------------

            pdfDoc
                .moveTo(50, tableTop + 18)
                .lineTo(545, tableTop + 18)
                .strokeColor('#999999')
                .stroke();


            // ----------------------------------------------------
            // PRODUCTS
            // ----------------------------------------------------

            let productY = tableTop + 32;

            let totalAmount = 0;

            order.items.forEach((product, index) => {

                totalAmount += product.product.totalPrice;
                pdfDoc
                    .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                    .fontSize(10)
                    .fillColor('#000000');

                pdfDoc.text(index + 1, colNo, productY);

                pdfDoc.text(
                    product.product.title,
                    colDescription,
                    productY
                );

                pdfDoc.text(
                    product.product.quantity,
                    colQuantity,
                    productY
                );

                pdfDoc.text(
                    '₹' + currencyINR(product.product.price),
                    colUnitPrice,
                    productY
                );

                pdfDoc.text(
                    '₹' + product.product.quantPrice,
                    colTotal,
                    productY
                );

                productY += 35;

            });


            // ----------------------------------------------------
            // TABLE BOTTOM LINE
            // ----------------------------------------------------

            pdfDoc
                .moveTo(50, productY - 15)
                .lineTo(545, productY - 15)
                .strokeColor('#999999')
                .stroke();


            // ----------------------------------------------------
            // TOTALS
            // ----------------------------------------------------

            const totalsY = productY + 15;

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .text('Sub Total:', 390, totalsY);

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .text(
                    '₹' + currencyINR(totalAmount),
                    470,
                    totalsY,
                    {
                        width: 75,
                        align: 'right'
                    }
                );

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .text('Discount:', 390, totalsY + 30);

            pdfDoc
                .text(
                    '- ' + '₹100.00',
                    470,
                    totalsY + 30,
                    {
                        width: 75,
                        align: 'right'
                    }
                );


            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .text('Delivery fee:', 390, totalsY + 60);

            pdfDoc
                .text(
                    '+ ' + '₹99.00',
                    470,
                    totalsY + 60,
                    {
                        width: 75,
                        align: 'right'
                    }
                );


            pdfDoc
                .moveTo(390, productY + 95)
                .lineTo(545, productY + 95)
                .strokeColor('#999999')
                .stroke();

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans-Bold.ttf'))
                .fontSize(11)
                .text('Total:', 390, totalsY + 90);

            pdfDoc
                .text(
                    '₹' + currencyINR(totalAmount - 100 + 99),
                    470,
                    totalsY + 90,
                    {
                        width: 75,
                        align: 'right'
                    }
                );





            // ----------------------------------------------------
            // FOOTER
            // ----------------------------------------------------

            pdfDoc
                .font(path.join(__dirname, '../fonts/DejaVuSans.ttf'))
                .fontSize(10)
                .fillColor('#555555')
                .text(
                    'Thank you for trusting us',
                    50,
                    760,
                    {
                        width: 495,
                        align: 'center'
                    }
                );



            pdfDoc.end();
        });

}


exports.getPosts = (req, res, next) => {
    res.status(200).json({
        post: {
            name: 'my first REST API',
            postedBy: 'owais'
        }
    })
}

exports.createPost = (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: "Post created successfully",
        post: {
            id: Date.now(),
            title,
            content
        }
    })
}
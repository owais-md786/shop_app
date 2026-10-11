const Product = require('../models/product');

//const mongodb = require('mongodb')

//const getdb = require('../util/databaseMongoDB').getdb;

const io=require('../socketInitialize')
const User = require('../models/user');

const path=require('path')

const currencyINR = require('../indian_currency_getter').india;

const deleteFile=require('../util/file').deleteFile


exports.postAddProduct = (req, res, next) => {
    /*  products.push({title:req.body.title,price:req.body.price}); */
    
    const title = req.body.title.trim();
    const price = req.body.price
    const image = req.file
    const description = req.body.description.trim()
    const specification=req.body.specification.trim()
    console.log('image', image)

    if (!image) {
        return res.status(422).render('admin/add-products', {
            pageTitle: 'Add Product', path: '/admin/add-products',
            oldInput:{ 
                title,price,description
            },
            errorMessage:'Attached file is not .png, .jpg or .jpeg'
        });
    }

    const imageURL=image.filename;
    //const product = new Product(title, price, description, imageURL,req.user._id); //for mongodb driver or sql
    const product = new Product({
        title: title,
        price: price,
        description: description,
        specification:specification,
        imageURL: imageURL,
        adminId: req.admin._id
    });

    let csrfTokenTest=req.csrfToken();

    //console.log('this on add req user product',req.user);
    product.save().then(() => {
        // console.log('result from mongo',result);
        console.log('product created');

        io.getIO().emit('productCreated',{
            action:'A new product added to Node Shop App',
            product:product,
            csrfTokenTest:csrfTokenTest
        })
        
        res.redirect('/admin/products');

    }).catch((err) => {
        console.log(err);
        const error = new Error(err);
        error.statusCode = 500;
        return next(error);
    })

    /*  req.user.createSequelizeproduct({ //MODEL NAME PE ASSOCIATION CREATE HOGA
         title:title,
         price:price,
         imageURL:imageURL,
         description:description
     }).then(product => {
         console.log(product);
         res.redirect('/products');
})
       .catch(err => console.log(err)); */



    /* Product.create({
        title:title,
        price:price,
        imageURL:imageURL,
        description:description,
        userProductId:req.user.id
    }).then(product => {
        console.log(product);
        res.redirect('/products');
})
      .catch(err => console.log(err)); */
};


exports.getAddProduct = (req, res, next) => {
    /*  res.sendFile(path.join(__dirname,'..','views','add-products.html')) */
    res.render('admin/add-products', {
        pageTitle: 'Add Product', path: '/admin/add-products',
        oldInput:{
                title:'',price:'',description:'',specification:''
            },
            errorMessage:''
    });
}


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log('edit mode is', editMode);

    //const productsFetched = Product.fetchAll();

    const prodId = req.params.productId;


    /* productsFetched.then(([row, fieldData]) => {
        const product = row.find(p => p.id == prodId);

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product
        });

    }).catch((err) => {
        console.log(err);
    }) */




    // Product.findOne(prodId)
    // .then(product =>{
    //     console.log('i a from edit',product);
    //     res.render('admin/edit-product', {
    //     pageTitle: 'Edit Product',
    //     path: '/admin/edit-product',
    //     editing: editMode,
    //     product,
    //     isAuthenticated:req.session.isLoggedIn
    // });
    // })
    // .catch(err=>{
    //     console.log(err);
    // }) 


    Product.findById(prodId)
        .then(product => {
            console.log('i a from edit', product);
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product,
                /* isAuthenticated:req.session.isLoggedIn */
            });
        })
        .catch(err => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })


    //         /* req.user.getSequelizeproducts({where:{id:+prodId}})
    //         //Product.findByPk(+prodId)
    //         .then(products =>{
    //             console.log('this is array',products);
    //             console.log('this is my data',products[0].dataValues);
    //             const product=products[0].dataValues

    //             res.render('admin/edit-product', {
    //             pageTitle: 'Edit Product',
    //             path: '/admin/edit-product',
    //             editing: editMode,
    //             product
    //         })
    //         }).catch(err =>{
    //             console.log(err);
    //         }) */




};


exports.postEditProduct = (req, res, next) => {
    const title = req.body.title.trim()
    const price = req.body.price
    const image = req.file
    const description = req.body.description.trim();
    const specification=req.body.specification.trim();
    const prodId = req.body.productId;

    console.log('this is from edit product',image)

    /* const productsFetched = Product.fetchAll();

    productsFetched.then(([row, fieldData]) => {
        const product = row.find(p => p.id == prodId);
        console.log(product); */

    /*  product.title = title;
     product.price = +price;
     product.imageURL = imageURL;
     product.description = description; */

    /*  const updateData = Product.toUpdateData(title, +price, description, imageURL, +prodId);

     updateData.then(() => {

         console.log('new', product);

         console.log('hell', row);

         res.redirect('/admin/products');
     }).catch((error) => console.log(error));


 }).catch((err) => {
     console.log(error);
 }); */



    // Product.toUpdateData(title,price,description,imageURL,prodId)  //mongodb driver
    // .then(product =>{
    //     console.log('this is post edit',product);
    //     res.redirect('/admin/products');
    // })
    // .catch(err =>{
    //     console.log(err);
    // })


    Product.findById(prodId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.specification=specification;
            if(image){
                deleteFile(path.join(__dirname,'../','public','images',product.imageURL))
                product.imageURL = image.filename;
            }
            return product.save()
        })
        .then(result => {
            console.log('this is from post edit', result);

            io.getIO().emit('productUpdate',{
                action:'Product updated successfully',
                newProduct:result
            })
            res.redirect('/admin/products');
        })
        .catch(err => {
            //console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })


    /* Product.findByPk(+prodId)
    .then(product =>{
        product.title=title;
        product.price=price;
        product.imageURL=imageURL;
        product.description=description;
        return product.save();
    })
    .then(product =>{
        console.log('UPDATED');
        res.redirect('/admin/products');
    })
    .catch(err =>{
        console.log(err);
    })*/



}


exports.getProducts = (req, res, next) => {
    /* const products = Product.fetchAll();
    console.log('admin-products.js', products);

    products.then(([row, fieldData]) => {

        res.render('admin/admin-product-list', {
            prodss: row,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }).catch((error) => {
        console.log(error);
    }) */



    Product.find({ adminId: req.admin._id })  //mongoose
        .then(products => {

            products.forEach(p => {
                p.formattedprice = currencyINR(p.price);
            })
            console.log('mera raja', products);
            res.render('admin/admin-product-list', {
                prodss: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',

                /* isAuthenticated:req.session.isLoggedIn */
            });

        })
        .catch((err) => {
            //console.log(error);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })


    /* req.user.getSequelizeproducts()
//Product.findAll()
        .then(products => {
            console.log('got it by sequeslize',products);
            res.render('admin/admin-product-list', {
        prodss: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
    });
        })
        .catch(err =>{
            console.log(err);
        })

        
//res.sendFile(path.join(__dirname,'..','views','shop.html'))*/
}



exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    //console.log('id',prodId);

    /* const productsFetched = Product.fetchAll();
    for(let i=0;i<productsFetched.length;i++){
        if(prodId === productsFetched[i].id){
            const prodDelete=productsFetched[i];
            for(let j=i+1;j<productsFetched.length;j++){
                productsFetched[j-1]=productsFetched[j];
            }
            productsFetched[productsFetched.length-1]=prodDelete;
        }
    }

    productsFetched.pop(); */



    /* Product.deleteProduct(prodId)
    res.redirect('/admin/products'); */

    //mongodb driver
    //     const db=getdb();
    // let impProd;
    //  db.collection('products').findOne({_id:new mongodb.ObjectId(prodId)})
    //  .then(product =>{

    //     console.log('laadle prod',product);
    // impProd=product;
    //  })

    // console.log('impproduct',impProd);
    //     Product.deleteProduct(prodId)
    //     .then(product=>{
    //         console.log('this is deleted',product);
    //         return req.user.deletePerCartItem(impProd)




    //     })
    //     /* .then((product)=>{
    //                 console.log('tell me tell',product);
    //                 return req.user.deletePerCartItem(product)
    //     }) */
    //     .then(ans =>{
    //         console.log(ans);
    //        res.redirect('/admin/products');
    //     })
    //     .catch(error =>{
    //         console.log(error);
    //     })

    //mongoose

    let impProd;
    Product.findById(prodId)
        .then(product => {

            console.log('laadle prod', product);
            impProd = product;
            console.log('from first db operation');
    

    return Product.findByIdAndDelete(prodId)
        .then(() => {
            io.getIO().emit('productDelete',{
                action:'Product deleted successfully',
                delProduct:impProd
            });

            console.log('what the error  ',impProd.imageURL);
            try{

                deleteFile(path.join(__dirname,'../','public','images',impProd.imageURL))
            }
            catch(err){
                console.err('File deletion unsuccessful');
            }
            console.log('Deleted Product');


            return User.find({ 'cart.items.productId': new mongodb.ObjectId(prodId) })
                .then(users => {
                    console.log('this all cart users', users);
                    for (let u of users) {

                        u.deletePerCartItem(impProd)
                    }
                    return;
                })
        })
    })
        .then(() => {


           // res.redirect('/admin/products');
           res.status(200).json({message:"Success"});

        })
        .catch(err => {
            //console.log(error);
            // const error = new Error(err);
            // error.httpStatusCode = 500;
            // return next(error);

            console.log('from this side');

            res.status(500).json({message:"Deletion Failed"})
        })




    //req.user.getSequelizeproducts({where:{id:prodId}})
    /* Product.findByPk(+prodId)
    .then(product =>{
        return product.destroy()
    })
    .then(product =>{
        console.log('DELETED');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err)) */


}
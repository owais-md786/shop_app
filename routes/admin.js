const path=require('path');
const express=require('express');

const adminController=require('../controllers/admin')


const isAuthA=require('../middleware/is-auth').forAdmin
const isAuthFU=require('../middleware/is-auth').forFreeUser

const router=express.Router();
//this router still works as app in newExpress.js
//A router is actually a middleware function



//  /admin/add-products
// router.get('/add-products',adminController.getAddProduct);
router.get('/add-products',isAuthA,isAuthFU,adminController.getAddProduct);

//  /admin/add-products
// router.post('/add-products',adminController.postAddProduct);
router.post('/add-products',isAuthA,isAuthFU,adminController.postAddProduct);

//   /admin/products
//  router.get('/products',adminController.getProducts)
  router.get('/products',isAuthA,isAuthFU,adminController.getProducts)

//   /admin/edit-product/:productId
// router.get('/edit-product/:productId',adminController.getEditProduct)
router.get('/edit-product/:productId',isAuthA,isAuthFU,adminController.getEditProduct)

//   /admin/edit-product
// router.post('/edit-product',adminController.postEditProduct)
router.post('/edit-product',isAuthA,isAuthFU,adminController.postEditProduct)

//   /admin/delete-product
// router.post('/delete-product',adminController.deleteProduct)
router.delete('/products/:productId',isAuthA,isAuthFU,adminController.deleteProduct) 

exports.routes=router;// this router is actually a valid middleware function
//exports.products=products; // this router is actually a valid middleware function 
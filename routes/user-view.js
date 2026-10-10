const path=require('path')
const express=require('express');

const isAuthU=require('../middleware/is-auth').forUser
const isAuthF=require('../middleware/is-auth').forFree


const router=express.Router();
//this router still works as app in newExpress.js
//A router is actually a middleware function


const shopController=require('../controllers/shop');

router.get('/',isAuthF,shopController.getIndex);

router.get('/products',isAuthF,shopController.getProducts)

router.get('/products/:productId',isAuthF,shopController.getProduct)

// router.get('/cart',shopController.getCart)
router.get('/cart',isAuthU,isAuthF,shopController.getCart)

// router.post('/add-cart',shopController.postAddCartQuantity)
router.post('/add-cart',isAuthU,isAuthF,shopController.postAddCartQuantity)

// router.post('/minus-cart',shopController.postMinusCartQuantity)
router.post('/minus-cart',isAuthU,isAuthF,shopController.postMinusCartQuantity)

// router.post('/delete-all-cart',shopController.postDeleteAllCart)
router.post('/delete-all-cart',isAuthU,isAuthF,shopController.postDeleteAllCart)

// router.post('/delete-cart',shopController.postDeleteCart)
router.post('/delete-cart',isAuthU,isAuthF,shopController.postDeleteCart)

// router.post('/cart',shopController.postCart)
router.post('/cart',isAuthU,isAuthF,shopController.postCart)

// router.post('/buy-cart',shopController.orderSummary)
router.post('/buy-cart',isAuthU,isAuthF,shopController.orderSummary)

// router.post('/post-order',shopController.postaddOrder)
router.post('/post-order',isAuthU,isAuthF,shopController.postaddOrder)

// router.get('/order-detail/:orderId/:productId',shopController.getOrderDetail)
router.get('/order-detail/:orderId/:productId',isAuthF,isAuthU,shopController.getOrderDetail)

// /* router.get('/checkout',shopController.getCheckout) */

// router.get('/orders',shopController.getOrders) 
router.get('/orders',isAuthF,isAuthU,shopController.getOrders) 

router.get('/orders/:orderId',isAuthF,isAuthU,shopController.getInvoice)
module.exports=router;// this router is actually a valid middleware function
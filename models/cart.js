/* const Products = require('./product')
const { cart } = require('./product');
let cartProducts = [];
let totalCart = { cartProducts, totalPrice: 0 };
let quantityy = 0;

module.exports = class Cart {
    static addProduct(id) {
        const productsArray = Products.fetchAll();
        console.log('from cart', productsArray);

        productsArray.then(([row,fieldData])=>{
            //console.log('I AM ROW',row);

            for (let i = 0; i < cartProducts.length; i++) {
                if (id === cartProducts[i].product.id) {
    
                    let quant = cartProducts[i].quantity;
                    console.log('quantity', quant);
                    quant = quant + 1;
    
                    cartProducts[i].quantity = quant;
    
                    const num = Number(cartProducts[i].product.price)
    
                    totalCart.totalPrice += num;
                    console.log('updated', cartProducts);
                    console.log('total cart', totalCart);
                    return;
                }
            }
            for (let i = 0; i < row.length; i++) {
                if (id === row[i].id) {
                    cartProducts.push({ product: row[i], quantity: 1 });
    
                    console.log('he its item', row);
                    console.log('he its item', row[i]);
    
    
                    totalCart.totalPrice += +row[i].price;
                }
            }
            console.log('added', cartProducts);
            console.log('total cart', totalCart);
            return;
        }).catch(err => {
            console.log(err);
        })

    }

    static showCartProduct() {
        return cartProducts;
    }
    static showTotalCart() {
        return totalCart;
    }

    static removeOnZeroQuantity(cartId) {

        const newcart = cartProducts.filter(p => p.product.id !== cartId);

        cartProducts = newcart;
    }

    static removePerCart(prodId) {
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].product.id === prodId) {
                cartProducts[i].quantity -= 1;

                //console.log('from minus',cart[i].quantity);
                totalCart.totalPrice -= cartProducts[i].product.price;

                //console.log('from minus',totalCart.totalPrice);
                console.log('from minus total cart is', totalCart);

                if (cartProducts[i].quantity === 0) {

                    Cart.removeOnZeroQuantity(cartProducts[i].product.id);

                }
            }
        }
    }
    static removePerCrossCart(prodId) {

        for (let i = 0; i < cartProducts.length; i++) {
            if (prodId === cartProducts[i].product.id) {

                totalCart.totalPrice = totalCart.totalPrice - (cartProducts[i].quantity * cartProducts[i].product.price);
                const newcart = cartProducts.filter(p => p.product.id !== prodId);
                cartProducts = newcart;
            }
        }
    }

    static deleteAllCart() {
        cartProducts = [];
        totalCart.totalPrice = 0;
    }

    static deleteOnProductDelete(prodId) {
        const product = cartProducts.find(p => p.product.id === prodId);

        if (product) {
            const priceIS=product.product.price;
            const quant=product.quantity;
            const newcart = cartProducts.filter(p => p.product.id !== product.product.id);
            totalCart.totalPrice-=(priceIS*quant);
            cartProducts = newcart;

        }

    }
} */


    /* const Sequelize=require('sequelize');
    const sequelize=require('../util/databaseMYSQL');


    const Cart=sequelize.define('sequelizeCart',{
        id:{
            type:Sequelize.INTEGER,
            
            autoIncrement:true,
            primaryKey:true

        }
    });

    module.exports=Cart; */
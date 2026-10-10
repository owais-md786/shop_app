/* const Sequelize=require('sequelize');
const sequelize=require('../util/databaseMYSQL');


const User=sequelize.define('userProduct',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    }
});

module.exports=User;


 */


//MongoDB

const currencyINR = require('../indian_currency_getter').india;

//        const mongodb=require('mongodb');
//        const getdb=require('../util/databaseMongoDB').getdb;

//        let orderId;

// class User{
//     constructor(username,email,phoneNumber,address,cart,password,id){
//         this.username=username;
//         this.email=email;
//         this.phoneNumber=phoneNumber;
//         this.address=address;
//         this.cart=cart; //{ items:[] }
//         this.password=password;

//         this._id=id;
//     }

//     save(){
//         const db=getdb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(product){
//         console.log('mere papapap',this);
//         const db=getdb();
//         if(this.cart === undefined){
//             this.cart={items:[]}
//         }
//         /* console.log('againh',this._id);
//         console.log('yess',this.cart);
//         console.log('yess',this.cart.items); */
//         const prodIndex=this.cart.items.findIndex(p => {
//             /* console.log('my id',p.productId);
//             console.log('my id',product._id); */
//             console.log(p.productId.toString() === product._id.toString());
//            return p.productId.toString() === product._id.toString();
//         })
//         console.log('found',prodIndex);

//         let newQuantity=1;
//         if(prodIndex >= 0){
//             newQuantity=this.cart.items[prodIndex].quantity+1;
//             return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
//             $set:{[`cart.items.${prodIndex}.quantity`]:newQuantity}
//         });
//         }
//         else{
//         //const updatedCart={items:[{productId:product._id,quantity:1}]};
//         const updatedCart=[...this.cart.items];
//         updatedCart.push({productId:product._id,quantity:newQuantity})




//         console.log('mera _id',this._id);
//         return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
//             $set:{cart:{items:updatedCart}}
//         });
//     }
//     }

// getCart(){
//     const db=getdb();
//     const productFetch=this.cart.items.map(p=>{
//         return p.productId;
//     })

//    return db.collection('products').find({_id:{$in:productFetch}}).toArray()
//    .then((products)=>{
//     return products.map(p =>{
//         return {
//             ...p,
//             quantity:this.cart.items.find(i => {
//                 return i.productId.toString() === p._id.toString();
//             }).quantity
//         }
//     })
//    })
//    .then((item) => {
//     return item.map( i =>{
//         return {
//             ...i,
//             totalPrice:(+i.price) * i.quantity,
//             quantPrice:currencyINR(""+((+i.price) * i.quantity))
//         }
//     })
//    })

// }

//     minusQuantity(product){
//         if(this.cart.items !== []){
//         const prodIndex=this.cart.items.findIndex(i =>{
//             return i.productId.toString() === product._id.toString();
//         });

//         //let newquantity;

//         const newquantity= (this.cart.items[prodIndex].quantity)-1;
//         if(newquantity===0){
//             this.deletePerCartItem(product)
//             .then(item =>{
//                 return;
//             })
//             return;
//         }
//         const db=getdb();
//         return db.collection('users').updateOne(
//             {
//                 _id:new mongodb.ObjectId(this._id)
//             },
//             {
//                 $set:{
//                     [`cart.items.${prodIndex}.quantity`]:newquantity
//                 }
//             }
//         );

//     }}

//     getForOrder(){


//         let mydate=new Date();
//         mydate.setDate(mydate.getDate()+9);



//         const db=getdb();
//         const productFetch=this.cart.items.map(p=>{
//             return p.productId;
//         })

//        return db.collection('products').find({_id:{$in:productFetch}}).toArray()
//        .then((products)=>{
//         return products.map(p =>{
//             return {
//                 ...p,
//                 quantity:this.cart.items.find(i => {
//                     return i.productId.toString() === p._id.toString();
//                 }).quantity
//             }
//         })
//        })
//        .then((item) => {
//         return item.map( i =>{
//             return {
//                 ...i,
//                 totalPrice:(+i.price) * i.quantity,
//                 quantPrice:currencyINR(""+((+i.price) * i.quantity)),
//                 orderDate:new Date(),
//                 deliveryDate:mydate,
//                 orderStatus:'Order Placed'
//             }
//         })
//        })

//     }




//     addOrder(){

//         const db=getdb();


//             return this.getForOrder()
//             .then(product=> {
//                 console.log('my love',product);
//                 console.log(product.toString() === [].toString());
//                 if(product.toString() !== [].toString()){
//                 let order={
//                 items:product,
//                 user:{
//                     _id:this._id,
//                     username:this.username,
//                     email:this.email,
//                     phoneNumber:this.phoneNumber,
//                     address:this.address
//                 }
//             }
//             return db.collection('orders').insertOne(order)
//             .then(result => {
//                 console.log('this is order doc',result,order);
//                 orderId=result.insertedId;
//                 this.cart.items=[];
//                 return db.collection('users').updateOne({_id:this._id},
//                     {
//                         $set:{cart:{ items:[] } }
//                     }
//                 )
//             })
//             .then(result =>{
//                 return {
//                     orderId
//                 }
//             })
//             }else{
//                 return {
//                     type:'null',


//                 }
//             }
//     }) 



//     }

//     deletePerCartItem(product){
//         /* const productIndex=this.cart.items.findIndex( p => {
//             return p.productId.toString() === product._id.toString();
//         }) */

//         console.log('look at me ',product);
//             console.log('this is deletpercat',this.cart.items);
//         const newArray=this.cart.items.filter( item =>{
// console.log('this is from baby',item);
//             console.log(item.productId.toString() !== product._id.toString());
//             return item.productId.toString() !== product._id.toString();
//         })
//         console.log('this is dleteing',newArray)
//         console.log('my iidd ',this._id,typeof this._id);

//         const db=getdb();
//         return db.collection('users').updateOne({_id:this._id},
//         {
//             $set:{['cart.items']:newArray}
//         })


//     }

//     deleteAll(){
//        const db=getdb();
//        return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
//             $set:{['cart.items']:[]}
//         });
//    }

//     static findOne(userId){
//         const db=getdb();
//         return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)});
//     }

// }

// module.exports=User;


//mongoose

const Product = require('../models/product')

const Order = require('../models/order')

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },

});


userSchema.methods.addToCart = function (product) {
    console.log('mere papapap', this);

    if (this.cart === undefined) {
        this.cart = { items: [] }
    }
    /* console.log('againh',this._id);
    console.log('yess',this.cart);
    console.log('yess',this.cart.items); */


    try {


        const prodIndex = this.cart.items.findIndex(p => {
            /* console.log('my id',p.productId);
            console.log('my id',product._id); */
            console.log(p.productId.toString() === product._id.toString());
            return p.productId.toString() === product._id.toString();
        })
        console.log('found', prodIndex);

        let newQuantity = 1;
        if (prodIndex >= 0) {
            newQuantity = this.cart.items[prodIndex].quantity + 1;

            this.cart.items[prodIndex].quantity = newQuantity;


            return this.save()
                .then(res => {

                    return this.getCart()

                })

                .then(product => {
                    // product.forEach(p => {
                    //     p.price = currencyINR(p.price);
                    // })
                    console.log('this is my cart from now', product);
                    return product;
                })


        }
        else {
            const updatedCart = [...this.cart.items];
            updatedCart.push({ productId: product._id, quantity: newQuantity })




            console.log('mera _id', this._id);

            this.cart.items = updatedCart;
            return this.save()
                .then(res => {

                    return this.getCart()

                })

                .then(product => {
                    console.log('this is my cart from now', product);
                    return product;
                })


        }
    }
    catch (err) {
        console.log(err);
        const error = new Error(err)
        error.statusCode = 500;
        throw error;
    }

}


userSchema.methods.getCart = function () {
    const productFetch = this.cart.items.map(p => {
        return p.productId;
    })

    let productlist = [];
    return Product.find({ _id: { $in: productFetch } })
        .then(products => {
            console.log('heyyeyyy', products);
            return products;
        })


        .then((products) => {

            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }
            })
        })


        .then((item) => {
            return item.map(i => {
                console.log('this is iii', i);
                return {
                    ...i,
                    totalPrice: i._doc.price * i.quantity,
                    quantPrice: currencyINR("" + ((i._doc.price) * i.quantity))
                }
            })


        })
}

userSchema.methods.minusQuantity = function (product) {

    try {


        if (this.cart.items !== []) {
            const prodIndex = this.cart.items.findIndex(i => {
                return i.productId.toString() === product._id.toString();
            });



            const newquantity = (this.cart.items[prodIndex].quantity) - 1;
            if (newquantity === 0) {
                return this.deletePerCartItem(product)
                    .then(item => {
                        console.log('minus after delete', item)
                        return item;
                    })
                return;
            }


            this.cart.items[prodIndex].quantity = newquantity;
            return this.save()
                .then(res => {

                    return this.getCart()

                })

                .then(product => {
                    console.log('this is my cart from minus', product);
                    return product;
                })
        }
    }

     catch (err) {
        console.log(err);
        const error = new Error(err)
        error.statusCode = 500;
        throw error;
    }




}

userSchema.methods.deletePerCartItem = function (product) {
    console.log('look at me ', product);
    console.log('this is deletpercat', this.cart.items);
    const newArray = this.cart.items.filter(item => {
        console.log('this is from baby', item);
        console.log(item.productId.toString() !== product._id.toString());
        return item.productId.toString() !== product._id.toString();
    })
    console.log('this is dleteing', newArray)
    console.log('my iidd ', this._id, typeof this._id);


    this.cart.items = newArray;
    return this.save()
        .then(res => {

            return this.getCart()

        })

        .then(product => {
            console.log('this is my cart from delete', product);
            return product;
        })

}

userSchema.methods.getForOrder = function () {


    let mydate = new Date();
    mydate.setDate(mydate.getDate() + 9);
    const productFetch = this.cart.items.map(p => {
        return p.productId;
    })

    //    return db.collection('products').find({_id:{$in:productFetch}}).toArray()
    let productlist = [];
    return Product.find({ _id: { $in: productFetch } })
        .then(products => {
            console.log('heyyeyyy', products);
            return products;
        })


        .then((products) => {
            // console.log('this is populate',productlist);
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }
            })
        })

        //console.log('looooowww',productlist2);
        .then((item) => {
            return item.map(i => {
                console.log('this is iii', i);
                return {
                    ...i,
                    totalPrice: i._doc.price * i.quantity,
                    quantPrice: currencyINR("" + ((i._doc.price) * i.quantity)),
                    orderDate: new Date(),
                    deliveryDate: mydate,
                    orderStatus: 'Order Placed'
                }
            })


        })
}

userSchema.methods.addOrder = function () {
    let orderId;
    let totalPricing = 0;
    let newTot = 0;
    const discount = 100;
    return this.getForOrder()
        .then(product => {
            console.log('my love', product);
            console.log(product.toString() === [].toString());
            if (product.toString() !== [].toString()) {

                product.forEach(e => {
                    totalPricing += e.totalPrice
                })

                newTot = (totalPricing - discount) + 99

                const productmongoose = product.map(i => {
                    return {
                        product: i
                    }
                })

                console.log('product mongoose', productmongoose)


                const order = new Order({
                    user: {
                        name: this.name,
                        email: this.email,
                        address: this.address,
                        phoneNumber: this.phoneNumber,
                        userId: this._id
                    },
                    items: productmongoose,
                    orderSummaryPrice: newTot,
                    orderSumINR: currencyINR(newTot)
                })
                return order.save()
                    .then(result => {
                        console.log('this is order doc', result, order);
                        orderId = result._id;
                        this.cart.items = [];
                        return this.save();
                    })
                    .then(result => {
                        return {
                            orderId
                        }
                    })
            } else {
                return {
                    type: 'null',


                }
            }
        })
}

module.exports = mongoose.model('User', userSchema);
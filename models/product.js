
// let products = [];


/* //USING MYSQL
const db=require('../util/databaseMYSQL');
*/

/* //USING MONGODB

 
const mongodb=require('mongodb')

const getdb=require('../util/databaseMongoDB').getdb;

 

 

module.exports = class Product {
constructor(title, price, description, imageURL,userId) {

  this.title = title.charAt(0).toUpperCase()+title.substring(1);
  this.price = price;
  this.description = description
  this.imageURL = imageURL;
  this.userId=userId;
}
 

save() {
  
//  return db.execute('INSERT INTO products (title,price,description,imageURL) VALUES (?,?,?,?)',[this.title,this.price,this.description,this.imageURL]); 

const db=getdb();
return db.collection('products').insertOne(this)
.then(result =>{
  console.log(result);
})
.catch(err =>{
  console.log(err);
})
}

static fetchAll() {
  //return products;

  //return db.execute('SELECT * FROM products');

  const db=getdb();
  return db.collection('products').find().toArray()
  // .then(products =>{
     // console.log(products);
      //return products;
 // })
  //.catch(err => console.log(err)) 
  
}
static findOne(prodId){
  const db=getdb();
  return db.collection('products').findOne({_id:new mongodb.ObjectId(prodId)})
  
}
static deleteProduct(prodId) {

  // const Cart=require('./cart');

 // let newarray = products.filter(p => p.id !== prodId);
  //products = newarray;

  //Cart.deleteOnProductDelete(prodId); 


  const db=getdb();
  return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)});



}

static toUpdateData(title,price,description,imageURL,prodId){
 // return db.execute('UPDATE products SET title=? , price=? , description=? , imageURL=? WHERE id=?',[title,price,description,imageURL,prodId]);

 const db=getdb();
 return db.collection('products').updateOne({_id:new mongodb.ObjectId(prodId)},{$set:{
  title:title,
  price:price,
  description:description,
  imageURL:imageURL
 }})
}
}  */


/* //USING SEQUELIZE
const Sequelize=require('sequelize');
const sequelize = require('../util/databaseMYSQL');

const Product=sequelize.define('sequelizeproducts',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageURL:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Product; */


//USING MONGOOSE


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        required:true
    },
    specification:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    adminId:{
        type:Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    }
});

module.exports=mongoose.model('Product',productSchema);
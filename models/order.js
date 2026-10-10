/*   const Sequelize=require('sequelize');
    const sequelize=require('../util/databaseMYSQL');


    const Order=sequelize.define('sequelizeOrder',{
        id:{
            type:Sequelize.INTEGER,
            
            autoIncrement:true,
            primaryKey:true

        },
        
    });

    module.exports=Order; */



const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [{
        product: {
            type: Object,
            required: true
        }
    }],
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }

    },
    orderSummaryPrice:Number,
    orderSumINR:String
});


module.exports = mongoose.model('Order', orderSchema);
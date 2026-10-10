const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'owais998',
    database: 'node_shopapp_db',
});


module.exports=pool.promise();

/* const db=pool.promise();

db.execute('SELECT * FROM products WHERE id = 2')// is found return promise with the result as the element and if not found then return result as empty array

.then((result)=>{
console.log(result[0]);
db.end();
})
.catch((error)=>{
console.log(error);
});
 */

/* const Sequelize = require('sequelize'); //importing sequelize class 

const sequelize=new Sequelize('node_shopapp_db','root','owais998',{
    dialect:'mysql',
    host:'localhost'
});


module.exports=sequelize; */

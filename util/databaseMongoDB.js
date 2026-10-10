const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect =(callback) =>{
    MongoClient.connect(process.env.MONGODB_URI)
    .then(client =>{
        console.log('Connected!');
        _db=client.db();   //storing access to database
        callback();
    }).catch(err =>{
        console.log(err);
        throw err;
    })
};

const getdb=()=>{
    if(_db){
        return _db;    //returning access to database , and used to interact to database 
    }
    throw 'No database found';
}

exports.mongoConnect=mongoConnect;
exports.getdb=getdb;
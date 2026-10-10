const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'OWAIS',
    database: 'test_db',
    /* user: 'owais__md',
    password: 'owais998', */
    driver:'SQL Server',
    options: {
        trustedConnection: true,
         trustServerCertificate: true,
        /*enableArithAbort:true,
        instancename:'MSSQLSERVER' */

    },

   
};


const db=sql.connect(config,(error)=>{
    if(error){
        console.log('Database connection error',error);
        return;
    }
    console.log('Database connected');
});


let request=db.request();
const result=request.query('SELECT * FROM EMPLOYEE');

console.log(request.recordsets);
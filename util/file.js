const fs=require('fs');

const deleteFile=(filePath)=>{
    fs.unlink(filePath,err=>{
        if(err){
            const error= new Error('No file found to delete');
            error.statusCode=403
            throw error;

        }
    })
}

module.exports.deleteFile=deleteFile;
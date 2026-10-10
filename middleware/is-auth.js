module.exports.forUser=(req,res,next)=>{
    if(!req.session.isLoggedInUser && !req.session.isLoggedInAdmin){
        return res.redirect('/login');
    }
    next();
}


module.exports.forAdmin=(req,res,next)=>{
    if( !req.session.isLoggedInUser && !req.session.isLoggedInAdmin){
        return res.redirect('/admin/login');
    }
    next();
}



module.exports.forFreeUser=(req,res,next)=>{
    if(req.session.isLoggedInAdmin === false && req.session.isLoggedInUser === true ){
        return res.redirect('/products');
    }
    next();
}

module.exports.forFree=(req,res,next)=>{
    if(!req.session.isLoggedInUser && req.session.isLoggedInAdmin ){
        return res.redirect('/admin/products');
    }
    next();
}
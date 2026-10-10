

exports.error404=(req, res, next) => {
   /*  res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) */
   res.status(404).render('404',{pageTitle:'Page not found'});
};

exports.error500=(req, res, next) => {
   
   res.status(500).render('500',{pageTitle:'Internal Server Error'});
};
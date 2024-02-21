const isAdmin =async(req, res, next) => {
  
    if (req.user && req.user.role==="Owner") {
   
      return next();
    }else{
      return res.status(401).send({ message: 'Owner Token is not valid.' });
    }
    
  };

  module.exports=isAdmin
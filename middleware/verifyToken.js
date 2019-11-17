const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
  try{
    const token = req.header('Bearer');
    if(!token)
      return res.status(401).send('Access Denied');
    
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  }catch(error){
    res.status(400).send(error);
  }
}
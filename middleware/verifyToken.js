const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
  try{
    let token = req.headers['x-access-token'] || req.headers['Authorization'];
    if (token.startsWith('Bearer')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    
    if(!token)
      return res.status(401).send('Access Denied');
    
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  }catch(error){
    res.status(400).send(error);
  }
}
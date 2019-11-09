const jwt = require('jsonwebtoken');

function auth(req, res, next){
  try{
    const token = req.header('auth-token');
    if(!token)
      return res.status(401).send('Access Denied');
    
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  }catch(error){
    res.status(400).send(error);
  }
}
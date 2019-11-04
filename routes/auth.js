const router = require('express').Router();

const Users = require('../model/Users');

router.post('/register', async (req,res) => {
  try{
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const savedUser = await user.save()
    res.status(200).send(savedUser);
  }catch(error){
    res.status(400).send('Error: ',error);
  }
});

router.post('/login');

module.exports = router;
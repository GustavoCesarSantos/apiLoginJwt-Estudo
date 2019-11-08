const router = require('express').Router();

const Users = require('../model/Users');
const validation = require('../validation');

router.post('/register', async (req,res) => {
  try{  
    //Validate the data before we create user
    const { error } = userSchemaValidate.validate(req.body);
    if(error)
      return res.status(400).send(error.details[0].message)

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    const savedUser = await user.save()
    res.status(200).send(savedUser);
  }catch(error){
    res.status(400).send(error);
  }
});

router.post('/login');

module.exports = router;
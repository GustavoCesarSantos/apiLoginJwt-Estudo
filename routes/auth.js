const router = require('express').Router();
const Joi = require('@hapi/joi');

const Users = require('../model/Users');

//Schema for validation
const userSchemaValidate = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(8).max(1024).required()
})

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
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../model/Users');
const { registerValidation, loginValidation } = require('../helpers/validation');

router.post('/register', async (req,res) => {
  try{  
    // //Validate the data before we create user
    const { error } = registerValidation(req.body);
    if(error)
      return res.status(400).send(error.details[0].message);
    
    // //Checking if the user is already in the database
    const emailExist = await Users.findOne({ email: req.body.email });
    if(emailExist)
      return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create new user
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })

    const savedUser = await user.save()
    res.status(200).send({ user: savedUser._id });
  }catch(error){
    res.status(400).send(error);
  }
});

router.post('/login', async (req,res) => {
  try{
    // //Validate the data before we  accomplish login
    const { error } = loginValidation(req.body);
    if(error)
      return res.status(400).send(error.details[0].message);
    
    //Checking if the email exists
    const user = await Users.findOne({ email: req.body.email });
    if(!user)
      return res.status(400).send('Email or password is wrong');
    
    //Checking if the password exists
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
      return res.status(400).send('Email or password is wrong');
    
    //Create and asign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: 'true', token: token });
  }catch(error){
    res.status(400).send(error);
  }
});

module.exports = router;
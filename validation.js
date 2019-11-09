const Joi = require('@hapi/joi');

const registerValidation = (reqBody) => {
  //Schema for validation
  const userSchemaValidate = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).max(1024).required()
  });

  return userSchemaValidate.validate(reqBody);
};

const loginValidation = (reqBody) => {
  //Schema for validation
  const loginSchemaValidate = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).max(1024).required()
  });

  return loginSchemaValidate.validate(reqBody);
};

module.exports = { registerValidation, loginValidation }
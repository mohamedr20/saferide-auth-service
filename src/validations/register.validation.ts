import Joi from 'joi';

const registerSchema = Joi.object().keys({
  username: Joi.string().alphanum().max(20).required(),
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(), // Must be XXX-XXX-XXXX format
  email: Joi.string()
        .email({tlds: { allow: ['com', 'net'] } })
        .required(),
  password: Joi.string()  
        .alphanum()
        .min(6)
        .max(20)
        .required()
})

export default registerSchema;
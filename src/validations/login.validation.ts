import Joi from 'joi';

const loginSchema = Joi.object().keys({
  email: Joi.string()
        .email({tlds: { allow: ['com', 'net'] } })
        .required(),
  password: Joi.string()  
        .alphanum()
        .min(6)
        .max(20)
        .required()
})


export default loginSchema;
const Joi = require("joi")

const registerSchema = Joi.object({
    firstName: Joi.string().min(4).max(30).required(),
    lastName: Joi.string().min(4).max(30).required(),
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().required().min(8).max(30),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').options({ messages: { 'any.only': '{{#label}} does not match'} })
})

const registrationValidation = (data => {
    return registerSchema.validate(data);
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const loginValidation = (data => {
    return loginSchema.validate(data);
})

module.exports = {
    registrationValidation: registrationValidation,
    loginValidation: loginValidation,
    
}
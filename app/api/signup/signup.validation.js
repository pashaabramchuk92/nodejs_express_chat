const { Joi } = require('celebrate');

const signUpValidation = {
    body: Joi.object({
        email: Joi.string().trim().required(),
        birthday: Joi.date().iso().required(),
        password: Joi.string().min(3).required(),
        repeat_password: Joi.string().equal(Joi.ref('password')).required()
    })
}

module.exports = {
    signUpValidation,
}
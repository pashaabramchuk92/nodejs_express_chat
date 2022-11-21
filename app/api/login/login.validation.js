const { Joi } = require('celebrate');

const loginValidation = {
    body: Joi.object({
        email: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
    })
}

module.exports = {
    loginValidation,
}
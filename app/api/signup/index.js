const { Router } = require('express');

const { validate, alreadyAuth } = require('../../middlewares');
const { getSignup, postSignup } = require('./signup.controller');
const { signUpValidation } = require('./signup.validation');

const router = Router();

router.get('/', alreadyAuth, getSignup);

router.post('/', validate(signUpValidation), postSignup);

module.exports = router;
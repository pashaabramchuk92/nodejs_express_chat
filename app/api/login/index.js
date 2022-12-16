const { Router } = require('express');

const { validate, alreadyAuth, isAuth } = require('../../middlewares');
const { getLogin, postLogin, logout } = require('./login.controller');
const { loginValidation } = require('./login.validation');

const router = Router();

router.get('/', alreadyAuth, getLogin);

router.post('/', validate(loginValidation), postLogin);

router.get('/logout', isAuth, logout);

module.exports = router;
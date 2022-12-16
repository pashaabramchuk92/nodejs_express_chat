const { Router } = require('express');
const { isAuth } = require('../../middlewares');

const {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
} = require('./users.controller');

const router = Router();

router.get('/:user_id', getUser);

router.put('/:user_id', updateUser);

router.delete('/:user_id', deleteUser);

router.post('/', createUser);

router.get('/', getUsers);

module.exports = router;
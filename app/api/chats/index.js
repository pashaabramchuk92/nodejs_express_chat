const { Router } = require('express');
const { isAuth } = require('../../middlewares');

const {
    getChats,
    getChat,
    updateChat,
    createChat,
    deleteChat
} = require('./chats.controller');

const router = Router();

router.get('/:chat_id', getChat);

router.put('/:chat_id', updateChat);

router.delete('/:chat_id', deleteChat);

router.post('/', createChat);

router.get('/', getChats);

module.exports = router;
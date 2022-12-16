const { renderService } = require('../../services');

const getChats = (req, res) => {
    renderService.renderPage(res, {
        page: 'chats'
    });
}

const getChat = (req, res) => {
    renderService.renderPage(res, {
        page: 'chat'
    });
}

const createChat = (req, res) => {
    res.json('chat created');
}

const updateChat = (req, res) => {
    res.json('chat edited');
}

const deleteChat = (req, res) => {
    res.json('chat deleted');
}

module.exports = {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat
}
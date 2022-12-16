const userProvider = require('../../providers/user.provider');
const { renderService } = require('../../services');

const getUsers = async (req, res) => {
    try {
        const users = await userProvider.getUsers();

        if (!users) {
            throw new Error('Users not found');
        }

        renderService.renderPage(res, {
            page: 'users',
            users,
        });
    } catch(e) {
        renderErrors(req, res, {
            error: e.message
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userProvider.getUserById(req.params.user_id);

        if (!user) {
            throw new Error('User not found');
        }

        renderService.renderPage(res, {
            page: 'user',
            user,
        });
    } catch(e) {
        renderService.renderErrors(res, { error: e.message });
    }
}

const updateUser = (req, res) => {
    res.json('user edited');
}

const createUser = (req, res) => {
    res.json('user created');
}

const deleteUser = (req, res) => {
    res.json('user deleted');
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}
const userProvider = require('../../providers/user.provider');
const { renderService } = require('../../services');

const getSignup = (req, res) => {
    renderService.renderPage(res, {
        page: 'signup',
        error: false
    });
}

const postSignup = async (req, res) => {
    try {
        const user = await userProvider.createUser(req.body);

        if (!user) {
            throw new Error('Error creating user');
        }

        res.redirect('/login');
    } catch(e) {
        renderService.renderErrors(res, {
            error: e.message,
            page: 'login'
        });
    }
}

module.exports = {
    getSignup,
    postSignup
}
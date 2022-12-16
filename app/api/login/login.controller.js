const userProvider = require('../../providers/user.provider');
const { renderService } = require('../../services');

const getLogin = (req, res) => {
    renderService.renderPage(res, {
        page: 'login',
        error: false
    });
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userProvider.getUserByEmail(email);

        if (!user) {
            throw new Error('Incorrect email');
        }

        if (user.password !== password) {
            throw new Error('Incorrect password');
        }

        res.cookie('auth', true, { httpOnly: true });
        req.session.auth = true;
        req.session.profile = user;

        renderService.setUser(true, user);

        res.redirect('/');
    } catch(e) {
        renderService.renderErrors(res, {
            page: 'login',
            error: e.message
        });
    }
}

const logout = (req, res) => {
    res.clearCookie('auth');
    req.session.destroy(() => {
        renderService.setUser(false, null);
        res.redirect('/');
    });
}

module.exports = {
    getLogin,
    postLogin,
    logout
}
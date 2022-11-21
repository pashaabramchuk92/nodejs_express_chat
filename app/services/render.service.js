class RenderTemplatesService {
    constructor() {
        this._auth = false;
        this._profile = null;
    }

    setUser(auth, user) {
        this._auth = auth;
        this._profile = user;
    }

    renderErrors(res, options = {}) {
        const { status, page, error, users } = options;

        res.status(status || 404).render('index', {
            page: page || 'error',
            error,
            auth: this._auth,
            profile: this._profile,
            users: users || []
        });
    }

    renderPage(res, options = {}) {
        const { page, error, user, users } = options;

        res.render('index', {
            page,
            auth: this._auth,
            profile: this._profile,
            error: error || false,
            user: user || {},
            users: users || []
        });
    }
}

module.exports = new RenderTemplatesService();
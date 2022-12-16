const { get } = require('lodash');

const { renderService } = require('./services');

const isAuth = (req, res, next) => {
    if (!get(req.cookies, 'auth', false)) {
        renderService.renderErrors(res, { 
            page: 'errors',
            error: 'Access denied. You should be authorized!',
            status: 401
        });
    } else {
        next();
    }
}

const alreadyAuth = (req, res, next) => {
    if (get(req.cookies, 'auth', false)) {
        res.redirect('/users');
    } else {
        next();
    }
}

const validate = (schema) => {
    return async(req, res, next) => {
        try {
            const validation_config = {};


            if (schema.params) {
                validation_config['params'] = req.params;
            }

            if (schema.query) {
                validation_config['query'] = req.query;
            }

            if (schema.body) {
                validation_config['body'] = req.body;
            }

            await Promise.all(Object.keys(schema).map((key) => {
                return schema[key].validateAsync(validation_config[key]);
            }));
            
            next();
        } catch(e) {
            const page = req.baseUrl.replace('/', '');

            renderService.renderErrors(res, { 
                page: page === 'login' || page === 'signup' ? page : 'error',
                error: e.message
            });
        }
    }
}

module.exports = {
    isAuth,
    alreadyAuth,
    validate,
}
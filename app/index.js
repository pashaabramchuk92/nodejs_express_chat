const express = require('express');
const path = require('path');
const config = require('config');
const coockieParser = require('cookie-parser');
const session = require('express-session');
const { errors } = require('celebrate');

const loginModule = require('./api/login');
const signupModule = require('./api/signup');
const usersModule = require('./api/users');
const chatsModule = require('./api/chats');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'views'));
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(coockieParser(config.get('coockieSecret')));
app.use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true,
}));

app.use('/assets', express.static(path.join('assets')));

app.use('/login', loginModule);

app.use('/signup', signupModule);

app.use('/users', usersModule);

app.use('/chats', chatsModule);

app.use('/', (req, res) => {
    res.redirect('/users');
});

app.use(errors());

module.exports = app;
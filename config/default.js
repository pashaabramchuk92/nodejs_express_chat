const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    port: dev ? 3000 : 80,
    coockieSecret: '123213qasdasdas',
    sessionSecret: 'sjsjs213'
}
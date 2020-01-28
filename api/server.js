const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./config-middleware');

/////session/cookies
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../data/dbConfig");
////////

const server = express();

/////session/cookies
const sessionConfig = {
    name: "Mr. Chief",
    secret: process.env.SESSION_SECRET || 'keept it secret!',
    cookie: {
        maxAge: 1000 * 60 * 10, //10 minutes in millisecs
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 60000,
    })
};
//////////

//can still use configure middleware??????
configureMiddleware(server);



//// session related
server.use(session(sessionConfig));
//////////////

server.use('/api', apiRouter);

module.exports = server;
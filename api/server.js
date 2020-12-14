const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

const sessionConfig = {
    name: "banana",
    secret: "shhhhhhhhhhhhhhhhhhh",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false, 
        httpOnly: true,
    },
    resave: false, // set to true if idle sessions are being deleted
    saveUninitialized: false, // keep false to avoid saving/sending cookies for unmodified sessions

    store: new KnexSessionStore({
        knex: require("../database/connection"),
        tablename: "sessions",
        sidfieldname: "sessionId",
        createtable: true,
        clearIntervale: 1000 * 60 * 60,
    }),
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "Up!" });
});

module.exports = server;

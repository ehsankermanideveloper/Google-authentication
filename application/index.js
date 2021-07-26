const http = require('http')
const fs = require('fs')
const path = require('path')

const express = require('express')
const epxressSession = require('express-session')
const cookieParser = require('cookie-parser')
// dotenv
require('dotenv').config({ path: path.resolve('./development.env') })
// global config
global.config = require('../config/index')
const mongoose = require('mongoose')
const passport = require('passport')
const autoBind = require('auto-bind')

const app = express()

class application {
    constructor() {
        autoBind(this)
        this.server()
        this.configuration()
        this.route()
    }
    server() {
        const server = http.createServer(app)
        server.listen(process.env.PORT || 3000, (err) => {
            if (err) {
                console.error(err)
            } else {
                console.log('the server run on Port : ', process.env.PORT || 3000);
            }
        })
    }
    configuration() {
        app.use(express.json())
        app.use(express.urlencoded({ extended: false }))

        // mongoose connect
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('the mongodb Connect');
            }
        })

        // cookie parser
        app.use(cookieParser(process.env.COOKIE_PARSER_EXPRESS_SESSION_SECRET))
        // session
        app.use(epxressSession(config.Services.Session))

        // passport
        require('./passport/google-passport')
        app.use(passport.initialize())
        app.use(passport.session())
    }
    route() {
        app.use('/' , require('./routes/index'))
    }
}


module.exports = new application()
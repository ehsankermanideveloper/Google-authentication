module.exports = {
    Session : {
        secret : process.env.COOKIE_PARSER_EXPRESS_SESSION_SECRET,
        resave : true,
        saveUninitialized : true,
        cookie : {secure : false}
    }
}
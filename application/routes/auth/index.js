const express = require('express')
const route = express.Router()
const passport = require('passport')

route.get('/google', passport.authenticate('Google', { scope: ['email', 'profile'] }))


route.get('/google/callback', passport.authenticate('Google'), (req, res, next) => {
    res.redirect('/')
    next()
})


module.exports = route
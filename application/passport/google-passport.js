const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Users = require('../models/Users')
const bcryptjs = require('bcryptjs')
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user)
    })
})


passport.use('Google', new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_ID,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback : true

}, (request,accessToken, refreshToken, profile, cb) => {
    Users.findOne({ 'email': profile.displayName }, (err, data) => {
        if (err) {
            return console.log(err)
        }
        if (data !== null) {
            request.login(data , (err)=>{
                if(err){
                    console.log(err)
                }else{
                    cb(null , data)
                }
            })
        } else {
            const password = bcryptjs.hashSync(profile.emails[0].value, bcryptjs.genSaltSync(10))
            const newUser = new Users({
                username: profile.displayName,
                email: profile.emails[0].value,
                password
            })
            newUser.save((err, data)=>{
                if(err){
                    console.log(err)
                }else{
                    request.login(data , (err)=>{
                        if(err){
                            console.log(err)
                        }else{
                            cb(err , data)
                        }
                    })
                }
            })
        }
    })
}))
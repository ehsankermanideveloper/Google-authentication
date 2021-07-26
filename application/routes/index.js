const express = require('express')
const route = express.Router()

// controller
const IndexController = require('../http/controllers/indexController')
// route
const auth = require('./auth/index')
// index page
route.get('/' , IndexController.index)
route.get('/logout' , (req,res,next)=>{
    req.logout()
    return res.redirect('/')
})

route.use('/auth' , auth)



module.exports = route
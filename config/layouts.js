const expressejslayout = require('express-ejs-layouts')
const path = require('path')

module.exports = {
    ejs:'ejs',
    Public : './public',
    Dir_Views : path.resolve(path.resolve('./resuorce/views')),
    EJS:{
        expressejslayout ,
        master : 'master',

    }
}
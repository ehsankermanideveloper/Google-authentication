const packageJson = require('../../../package.json')
class IndexController {
    index(req, res, next) {
        if(req.user){
            return res.json(req.user)
        }else{
            return res.json(packageJson.dependencies)
        }
    }
}


module.exports = new IndexController()
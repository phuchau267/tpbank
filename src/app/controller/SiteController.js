const { mutipleMongooseToObject , mongooseToObject } = require('../../util/mongoose');
class CommentController {
    homePage(req, res, next){
        
        res.render('home')
    }
}
module.exports = new CommentController();
const { mutipleMongooseToObject , mongooseToObject } = require('../../util/mongoose');
class CommentController {
    homePage(req, res, next){
        
        res.render('home')
    }
    recruitmentPage(req, res, next){
        
        res.render('recruitment',{
            layout: 'recruitment-layout.hbs'
        })
    }
}
module.exports = new CommentController();
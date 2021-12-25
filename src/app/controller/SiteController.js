const meta = require('../../config/config')
class SiteController {
    homePage(req, res, next){
        
        res.render('home',{
            meta
        })
    }
    recruitmentPage(req, res, next){
        
        res.render('recruitment',{
            layout: 'recruitment-layout.hbs',
            meta
        })
    }
}
module.exports = new SiteController();
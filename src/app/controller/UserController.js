const { mutipleMongooseToObject , mongooseToObject } = require('../../util/mongoose');
const User = require('../../model/User');
const bcrypt = require('bcrypt');
class UserController {
    async checkWrongLogin(req, res, next){
        var wrongUsername = false
        var wrongPassword = false
        var resendLogin = false
        const userExist = await User.findOne({username:req.body.username})
        if(userExist){
            bcrypt.compare(req.body.password, userExist.password, (err, isMatch) => {
                    
                if (!isMatch) {
                    resendLogin = true
                    wrongPassword = true
                    res.render('login',{
                        layout: 'user-layout.hbs',
                        wrongPassword,
                        resendLogin,
                        username:req.body.username,
                        password:req.body.password
                    })
                    
                }else{
                    next()
                }
            });
        }else{
            wrongUsername = true
            resendLogin = true
            res.render('login',{
                layout: 'user-layout.hbs',
                wrongUsername,
                resendLogin,
                username:req.body.username,
                password:req.body.password
            })
        }
        
        
        
        
    }
    checkAdmin(req, res, next){
        
        if(req.user.role == 'admin'){
            return next()
        }
        res.send('ban khong co quyen truy cap')
    }
    checkLogin(req, res, next){
        
        if(!req.isAuthenticated()){
            return next()
        }
        res.redirect('/user/client')
    }
    checkAuthenticate(req, res, next){
        
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/user/login')
    }
    loginPage(req, res, next){
        
        res.render('login',{
            user:req.user,
            navOff:true,
            layout: 'user-layout.hbs'
        })
    }
    
    memberPage(req, res, next){
        User.find({role:'user'}).lean()
        .sort({createdAt: -1})
        .then(user => {
            
            res.render('member',{
                layout: 'user-layout.hbs',
                user:user,
                role:req.user.role,
                userName:req.user.username

            })
        })
        
    }
    async addMember(req, res, next){
        
        const hashPassword = async (password, saltRounds = 10) => {
            try {
                // Generate a salt
                const salt = await bcrypt.genSalt(saltRounds);
        
                // Hash password
                return await bcrypt.hash(password, salt);
            } catch (error) {
                console.log(error);
            }
        
            // Return null if error
            return null;
        };
        const hashedPassword = await hashPassword(req.body.password);
        
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            
        })
        user.save()
        .then(()=>{
            res.redirect('/user/member')
            
        })
            
             
    }
    userDelete(req, res, next){
        User.deleteOne({_id:req.params.id}).lean()
        .then(()=>{
            res.redirect('/user/member')
        })
        
    }
    memberHandle(req, res, next){
        User.deleteMany({_id:req.body.memberIds}).lean()
        .then(()=>{
            res.redirect('/user/member')
        })
        
    }
    logout(req, res, next){
        
        req.logout();
        res.clearCookie("connect.sid");
        res.redirect('/user/login');
        
    }
}
module.exports = new UserController();
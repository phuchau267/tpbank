const { mutipleMongooseToObject , mongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
const Client = require('../../model/Client')
const User = require('../../model/User')
const Job = require('../../model/Job')
class ClientController {
    
    clientSignUp(req, res, next){
        
            const client = new Client({
               
                name: req.body.name,
                birthDay: req.body.birthDay,
                birthMonth: req.body.birthMonth,
                birthYear: req.body.birthYear,
                cmnd: req.body.cmnd,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                fromUser:req.body.fromUser

            })

            client.save()
            
            .then(()=>{
                
                res.redirect('back')
            })
        
    }

    recruitmentSignUp(req, res, next){
        
            const job = new Job({
                name: req.body.name,
                yearborn:req.body.yearborn,
                cmnd: req.body.cmnd,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                level:req.body.level,
                exp:req.body.exp
            })
            job.save()
            
            .then(()=>{
                res.redirect('back')
            })
        
    }
    recruitmentPage(req, res, next){
        Job.find({}).lean()
        .then(recruitment => {
                
            res.render('recruitmentPage',{
                layout: 'user-layout.hbs',
                recruitment,
                role:req.user.role,
                userName:req.user.username
            })
            
        })
        
    }
    recruitmentDelete(req, res, next){
        Job.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('/user/recruitment'))
        
        
    }

    recruitmentHandle(req, res, next){
        Job.deleteMany({ _id: req.body.recruitmentIds})
        .then(()=> res.redirect('/user/recruitment'))
    }
    clientPage(req, res, next){
        if(req.user.role == 'admin'){
            Promise.all([
            
                Client.find({status:false,deleteRequest:false,potential:false}).lean()
                .then(),
                User.find({role:'user'}).lean()
                .select('username _id')
                
                
            ])
            
            .then(([client,user]) => {
               
                res.render('client',{
                    layout: 'user-layout.hbs',
                    client,
                    user,
                    clientPage:'true',
                    role:req.user.role,
                    userName:req.user.username
                })
                
            })
        }else{
                User.findOne({_id:req.user._id}).lean()
                .select('client -_id')
                .populate({
                    path:'client',
                    match: {status: false,potential:false},
                    sort:{updatedAt:-1}
                })
                .then(client => {
                
                    res.render('client',{
                        layout: 'user-layout.hbs',
                        client:client.client,
                        clientPage:'true',
                        role:req.user.role,
                        userName:req.user.username
                    })
                    
                })
        }
        
        
    }

    doneClientPage(req, res, next){
        
        if(req.user.role == 'admin'){
            Client.find({status:true}).lean()
            .then(client => {
               
                res.render('client',{
                    layout: 'user-layout.hbs',
                    doned:'true',
                    client,
                    
                    role:req.user.role,
                    userName:req.user.username
                })
            })
            
        }else{
            User.findOne({_id:req.user._id}).lean()
            .populate({
                path:'client',
                match: {status: true},
                sort:{updatedAt:-1}
            })
            .then(client => {
                
                res.render('client',{
                    layout: 'user-layout.hbs',
                    client:client.client,
                    doned:'true',
                    
                    role:req.user.role,
                    userName:req.user.username
                })
                
            })
        }
        
        
    } 


    clientDelete(req, res, next){
        if(req.user.role == 'admin'){
            Promise.all([
                Client.deleteOne({_id:req.params.id})
                .then(),
                User.updateOne({client:req.params.id},{$pull:{client: req.params.id }})
                .then()
            ])
            .then(()=>{
                res.redirect('back')
            })
            
        }else{
            Promise.all([
                User.updateOne({_id:req.user._id},{$pull:{client: req.params.id }})
                .then(),
                Client.updateOne({_id:req.params.id},{user:'khong co',deleteRequest:true})
                .then()
            ])
            
            .then(()=>{
                res.redirect('back')
            })
        }
        
        
    }
    clientHandle(req, res, next){
        let clientIds = req.body.clientIds;
        switch(req.body.action){
            
            case 'delete-client-option':
                
                if(req.user.role == 'admin'){
                    Promise.all([
                        Client.deleteMany({ _id: clientIds})
                        .then(),
                        clientIds.forEach(clientId => {
                            User.updateMany({client:clientId},{$pull:{client: clientId }})
                            .then()
                        })
                    ])
                    
                 
                    .then(()=>{
                        res.redirect('back')
                    })
                  
                    
                }else{
                    Promise.all([
                        clientIds.forEach(clientId => {
                        User.updateOne({_id:req.user._id},{$pull:{client: clientId }})
                        .then(),
                        Client.updateOne({_id:clientId},{user:'khong co',deleteRequest:true})
                        .then()
                    })])
                    .then(()=>{
                        res.redirect('back')
                    })
                    
                    
                }
                
                break;
            case 'send-client-option':
                
                Promise.all([clientIds.forEach(clientId => {
                    User.updateOne({client:clientId},{ $pull: { client: clientId  }})
                    .then(),
                    Client.updateOne({_id:clientId},{deleteRequest:false,potential:false,status:false, })
                    .then(),
                    User.updateOne({ _id: req.body.member},{ $addToSet: { client: clientId  }})
                    .then(),

                    User.findOne({_id: req.body.member}).lean()
                    .then(user=>{
                        Client.updateOne({_id:clientId},{user:user.username})
                        .then()
                    })
                    
                })])
                .then(()=>res.redirect('back'))
                .catch(next);
                break;

            default:
                break;
        }
        
    }
    clientDisbursed(req, res, next){
        let product = req.body.product
        var productName
        if(product == 'salary'){productName = 'Lương'}
        if(product == 'insurance'){productName = 'Bảo Hiểm'}
        if(product == 'contract'){productName = 'Hợp Đồng'}
        if(product == 'electric'){productName = 'Hóa Đơn'}
        if(product == 'student'){productName = 'Sinh Viên'}
        let money = req.body.money
        Client.updateOne({_id:req.params.id},{status: true,product:productName,money:money})
        .then(()=>res.redirect('back'))
        .catch(next);
    }
    clientPotential(req, res, next){
        
        Client.updateOne({_id:req.params.id},{potential: true,job:req.body.job,salary:req.body.salary,dayforwork:req.body.dayforwork})
        .then(()=>res.redirect('back'))
        .catch(next);
    }
    clientPotentialPage(req, res, next){
        if(req.user.role == 'admin'){
            Client.find({potential:true,status:false}).lean()
            .then(client => {
                    
                res.render('client',{
                    layout: 'user-layout.hbs',
                    client,
                    potential:'true',
                    
                    role:req.user.role,
                    userName:req.user.username
                })
                
            })
        }else{
            User.findOne({_id:req.user._id}).lean()
            .populate({
                path:'client',
                match: {potential: true,status:false},
                sort:{updatedAt:-1}
            })
            .then(client => {
                    
                res.render('client',{
                    layout: 'user-layout.hbs',
                    client:client.client,
                    potential:'true',
                    
                    role:req.user.role,
                    userName:req.user.username
                })
                
            })
        }
        
    }
    deleteRequest(req, res, next){
        Promise.all([
            Client.find({deleteRequest:true}).lean()
            .then(),
            User.find({role:'user'}).lean()
                .select('username _id')
        ])
        .then(([client,user]) => {
                
            res.render('client',{
                layout: 'user-layout.hbs',
                client,
                user,
                deleteRequest:'true',
                role:req.user.role,
                userName:req.user.username
            })
            
        })
    }
}
module.exports = new ClientController();
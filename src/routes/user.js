const express = require('express');
const router = express.Router();
const UserController = require('../app/controller/UserController')
const ClientController = require('../app/controller/ClientController')
const passport = require('passport')


router.post('/member/handleform',UserController.checkAuthenticate,UserController.checkAdmin,UserController.memberHandle);
router.post('/member/add',UserController.checkAuthenticate,UserController.checkAdmin,UserController.addMember);
router.post('/member/delete/:id',UserController.checkAuthenticate,UserController.checkAdmin,UserController.userDelete);
router.get('/member',UserController.checkAuthenticate,UserController.checkAdmin,UserController.memberPage);


router.get('/logout',UserController.checkAuthenticate,UserController.logout);
router.get('/login',UserController.checkLogin,UserController.loginPage);
router.post('/login',UserController.checkWrongLogin,passport.authenticate('local',{
    successRedirect: '/user/client',
    failureRedirect: '/user/login'
}));

router.get('/client/potential',UserController.checkAuthenticate,ClientController.clientPotentialPage);
router.post('/client/potential/:id',UserController.checkAuthenticate,ClientController.clientPotential);
router.post('/client/disbursed/:id',UserController.checkAuthenticate,ClientController.clientDisbursed);
router.post('/client/handleform',UserController.checkAuthenticate,ClientController.clientHandle);
router.get('/client',UserController.checkAuthenticate,ClientController.clientPage);
router.get('/client/done',UserController.checkAuthenticate,ClientController.doneClientPage);
router.post('/client/delete/:id',UserController.checkAuthenticate,ClientController.clientDelete);

router.get('/recruitment',UserController.checkAuthenticate,UserController.checkAdmin,ClientController.recruitmentPage);
router.post('/recruitment/delete/:id',UserController.checkAuthenticate,UserController.checkAdmin,ClientController.recruitmentDelete);
router.post('/recruitment/handleform',UserController.checkAuthenticate,UserController.checkAdmin,ClientController.recruitmentHandle);
router.get('/client/deleteRequest',UserController.checkAuthenticate,UserController.checkAdmin,ClientController.deleteRequest);


module.exports = router;
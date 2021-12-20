const express = require('express');
const router = express.Router();
const SiteController = require('../app/controller/SiteController')
const ClientController = require('../app/controller/ClientController')


router.get('/',SiteController.homePage);
router.get('/recruitment',SiteController.recruitmentPage);
router.post('/client-sign-up',ClientController.clientSignUp);
router.post('/recruitment-sign-up',ClientController.recruitmentSignUp);

module.exports = router;

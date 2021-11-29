const express = require('express');
const router = express.Router();
const SiteController = require('../app/controller/SiteController')


router.get('/',SiteController.homePage);
router.get('/recruitment',SiteController.recruitmentPage);

module.exports = router;

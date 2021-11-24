const express = require('express');
const router = express.Router();
const SiteController = require('../app/controller/SiteController')


router.get('/',SiteController.homePage);

module.exports = router;

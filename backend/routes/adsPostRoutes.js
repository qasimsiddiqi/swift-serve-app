const express = require('express');
const router = express.Router();
const adsPostController = require('../controllers/adsPostController');

router.post('/create', adsPostController.createAdsPost);

module.exports = router;

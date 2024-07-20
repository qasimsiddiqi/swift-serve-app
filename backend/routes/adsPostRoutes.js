const express = require('express');
const router = express.Router();
const adsPostController = require('../controllers/adsPostController');

router.post('/create', adsPostController.createAdsPost);
router.get('/', adsPostController.getAllAdsPosts);
router.get('/:id', adsPostController.getAdsPostById);

module.exports = router;

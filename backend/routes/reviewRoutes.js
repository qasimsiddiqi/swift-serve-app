const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/create', reviewController.createReview);
router.get('/:id', reviewController.getReviewsByAdsPostId);
router.get('/', reviewController.getAllReviews);

module.exports = router;

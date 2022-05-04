const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 *  App Routes
 */
router.get('/', recipeController.homepage);

router.get('/hedge', recipeController.exploreHedges);
router.get('/hedge/:id', recipeController.exploreHedgeById);


router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);

router.get('/submit-portfolio', recipeController.submitPortfolio);
router.post('/submit-portfolio', recipeController.submitPortfolioOnPost);

router.get('/stock/:ticker', recipeController.stockDetail);

module.exports = router;
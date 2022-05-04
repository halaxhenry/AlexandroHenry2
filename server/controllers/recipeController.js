require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const HedgeStock = require('../models/HedgeStock');
const HedgeFund = require('../models/HedgeFund');
const NasdaqUS = require('../models/NasdaqUS');
const NyseUS = require('../models/NyseUS');


/**
 * GET / 
 * Homepage
 */
exports.homepage = async(req,res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber) // 5개만 넘어오게
        
        // const thai = await Recipe.find({ 'category': 'Thai'}).limit(limitNumber);
        // const american = await Recipe.find({ 'category': 'American'}).limit(limitNumber);
        // const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(limitNumber);
        
        // const food = { latest, thai, american, chinese };

        const hedgefund = await HedgeFund.find({}).limit(limitNumber);
        
        res.render('index', { title: 'Alexandro Henry - Home', categories, hedgefund });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }  
}

/**
 * POST /search
 * Search
 */
 exports.searchRecipe = async(req, res) => {

  //searchTerm
  try {
      let searchTerm = req.body.searchTerm;

      // let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true, $caseSensitive: false }});
      // let recipe = await Recipe.find({ name: {$regex:`${searchTerm}`, $options : 'i'}}) // 검색 조건에 문자열 포함 및 대소문자 구별 X

      // or 조건문
      let nasdaqUS = await NasdaqUS.find({$or: [{ticker: {$regex:`^${searchTerm}`, $options : 'i'}}, {longnameUS: {$regex:`^${searchTerm}`, $options : 'i'}}]});
      let nyseUS = await NyseUS.find({$or: [{ticker: {$regex:`^${searchTerm}`, $options : 'i'}}, {longnameUS: {$regex:`^${searchTerm}`, $options : 'i'}}]})

      let hedgeFund = await HedgeFund.find({ stock: {$elemMatch: {symbol: {$regex:`${searchTerm}`, $options : 'i'}}}})

      const stock = {nasdaqUS, nyseUS}
      // res.json(nasdaqKRbyTicker);
      res.render('search', {title: 'Alexandro Henry - Search', stock, hedgeFund});
  } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred"});
  }

  
}



/**
 * POST /stock/:ticker
 * stockDetail
 */

 exports.stockDetail = async(req, res) => {

  try {
    let symbol = req.params.ticker;
    console.log(symbol)

    let nasdaqInfo = await NasdaqUS.findOne( {ticker: `${symbol}`})
    let nyseInfo = await NyseUS.findOne({ticker: `${symbol}`})

    // const stock = {nyseInfo, nasdaqInfo}
    // res.json(nasdaqInfo);
    
    res.render('stock-detail', {title: `Alexandro Henry - ${symbol}`, nasdaqInfo, nyseInfo})


  } catch(error) {
    res.status(500).send({ message: error.message || "Error Occurred"});
  }

 }

































/**
 * GET /categories
 * Categories 
*/
exports.exploreHedges = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('hedges', { title: 'Alexandro Henry - Categoreis', categories } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreHedgeById = async(req, res) => { 
    try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
      res.render('categories', { title: 'Alexandro Henry - Categoreis', categoryById } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 








/**
 * GET /explore-latest
 * Explore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)

    res.render('explore-latest', { title: 'Alexandro Henry - Explore Latest', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();

    // res.json(recipe)

    res.render('explore-random', { title: 'Alexandro Henry - Explore Latest', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /submit-portfolio
 * Submit Portfolio
*/
exports.submitPortfolio = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-portfolio', { title: 'Alexandro Henry - Submit Portfolio', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-portfolio
 * Submit Portfolio
*/
exports.submitPortfolioOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}

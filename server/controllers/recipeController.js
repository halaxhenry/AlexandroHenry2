require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET / 
 * Homepage
 */
exports.homepage = async(req,res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber) // 5개만 넘어오게
        
        const thai = await Recipe.find({ 'category': 'Thai'}).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American'}).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(limitNumber);
        
        const food = { latest, thai, american, chinese };
        
        res.render('index', { title: 'Alexandro Henry - Home', categories, food });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }  
}


/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'Alexandro Henry - Categoreis', categories } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
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
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
    try {
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('recipe', { title: 'Alexandro Henry - Recipe', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
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

        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }});
        // res.json(recipe);
        res.render('search', {title: 'Alexandro Henry - Search', recipe});
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred"});
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
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
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

    // const newRecipe = new Recipe({
    //   name: 'Biotech',
    //   description: 'Biotech company Portfolio',
    //   email: 'halaxhenry@gmail.com',
    //   ingredients: ['AMGN', 'BIIB', 'TECH', 'HRMY', 'REGN', 'CORT', 'INCY'],
    //   category: 'American',
    //   image: 'biotech.jpeg'
    // });

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

// async function deleteRecipe() {
//   try {
//     await Recipe.deleteOne({ name: 'New Recipe Updated'});
//   } catch (error) {
//     console.log(error);
//   }
// }

// deleteRecipe();


// async function updateRecipe() {
//   try {
//     const res = await Recipe.updateOne({ name: 'New Recipe'}, { name: 'New Recipe Updated'});
//     res.n; // Number of documents matched
//     res.nModified; // Number of documents modified
//   } catch (error) {
//     console.log(error);
//   }
// }

// updateRecipe()






// async function insertDummyCategoryData() {
    
//     try{
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": "thai-food.jpg"
//             },
//             {
//                 "name": "American",
//                 "image": "american-food.jpg"
//             },
//             {
//                 "name": "Chinese",
//                 "image": "chinese-food.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "mexican-food.jpg"
//             },
//             {
//                 "name": "Indian",
//                 "image": "indian-food.jpg"
//             },
//             {
//                 "name": "Spanish",
//                 "image": "spanish-food.jpg"
//             },
//             {
//                 "name": "Korean",
//                 "image": "korean-food.jpg"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();

// async function insertDummyCategoryData() {
    
//     try{
//         await Category.insertMany([
//             {
//                 "name": "John Templeton",
//                 "image": "JohnTempleton.jpeg"
//             },
//             {
//                 "name": "George Soros",
//                 "image": "GeorgeSoros.jpeg"
//             },
//             {
//                 "name": "Warren Buffett",
//                 "image": "WarrenBuffett.jpeg"
//             },
//             {
//                 "name": "Peter Lynch",
//                 "image": "PeterLynch.jpeg"
//             },
//             {
//                 "name": "Ray Dalio",
//                 "image": "RayDalio.jpeg"
//             },
//             {
//                 "name": "Cathie Wood",
//                 "image": "CathieWood.jpeg"
//             },
//             {
//                 "name": "Kotegawa Takashi",
//                 "image": "KotegawaTakashi.jpeg"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();


// async function insertDymmyRecipeData(){
//     try {
//     await Recipe.insertMany([
//         { 
//         "name": "Credit Payment Systems",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "creditsystem.jpeg"
//         },
//         { 
//             "name": "Electronic Car",
//             "description": `Recipe Description Goes Here`,
//             "email": "recipeemail@raddy.co.uk",
//             "ingredients": [
//                 "1 level teaspoon baking powder",
//                 "1 level teaspoon cayenne pepper",
//                 "1 level teaspoon hot smoked paprika",
//             ],
//             "category": "American", 
//             "image": "electronicCar.jpeg"
//         },
//         { 
//             "name": "FAAMNG",
//             "description": `Recipe Description Goes Here`,
//             "email": "recipeemail@raddy.co.uk",
//             "ingredients": [
//                 "1 level teaspoon baking powder",
//                 "1 level teaspoon cayenne pepper",
//                 "1 level teaspoon hot smoked paprika",
//             ],
//             "category": "American", 
//             "image": "faamng.jpeg"
//         },
//         { 
//             "name": "Foodies",
//             "description": `Recipe Description Goes Here`,
//             "email": "recipeemail@raddy.co.uk",
//             "ingredients": [
//                 "1 level teaspoon baking powder",
//                 "1 level teaspoon cayenne pepper",
//                 "1 level teaspoon hot smoked paprika",
//             ],
//             "category": "American", 
//             "image": "foodies.jpeg"
//         },
//         { 
//         "name": "Supermarkets",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "supermarket.jpeg"
//         },
//         { 
//             "name": "Tech Kings",
//             "description": `Recipe Description Goes Here`,
//             "email": "recipeemail@raddy.co.uk",
//             "ingredients": [
//                 "1 level teaspoon baking powder",
//                 "1 level teaspoon cayenne pepper",
//                 "1 level teaspoon hot smoked paprika",
//             ],
//             "category": "American", 
//             "image": "techIndustry.jpeg"
//         },
//     ]);
//     } catch (error) {
//     console.log('err', + error)
//     }
// }
    
// insertDymmyRecipeData();
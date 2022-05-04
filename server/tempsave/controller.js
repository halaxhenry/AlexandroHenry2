/**
 * GET /recipe/:id
 * Recipe 
*/

router.get('/recipe/:id', recipeController.exploreRecipe );
exports.exploreRecipe = async(req, res) => {
    try {
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      res.render('recipe', { title: 'Alexandro Henry - Recipe', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
} 



const { fetchRecipeById, updateRecipe } = require("../models/recipes-model");

exports.getRecipeById = (request, response, next) => {
    const { recipe_id } = request.params;
    fetchRecipeById(recipe_id)
      .then((recipe) => {
        response.status(200).send({ recipe });
      })
      .catch(next);
}

exports.patchRecipe = (request, response, next) => {
    const { recipe_id } = request.params;
    const patchInfo = request.body;
    updateRecipe(recipe_id, patchInfo)
      .then((recipe) => {
        response.status(200).send({ recipe });
      })
      .catch(next);
}
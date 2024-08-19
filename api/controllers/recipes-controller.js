const { fetchRecipeById } = require("../models/recipes-model");

exports.getRecipeById = (request, response, next) => {
    const { recipe_id } = request.params;
    fetchRecipeById(recipe_id)
      .then((recipe) => {
        response.status(200).send({ recipe });
      })
      .catch(next);
}
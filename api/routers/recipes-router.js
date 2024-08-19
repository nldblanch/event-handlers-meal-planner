const { getRecipeById, patchRecipe } = require("../controllers/recipes-controller");

const recipesRouter = require("express").Router();

recipesRouter.route("/")
recipesRouter.route("/:recipe_id").get(getRecipeById).patch(patchRecipe)

module.exports = recipesRouter;
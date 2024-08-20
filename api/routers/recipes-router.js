const { getRecipeById, patchRecipe, deleteRecipe } = require("../controllers/recipes-controller");

const recipesRouter = require("express").Router();

recipesRouter.route("/")
recipesRouter.route("/:recipe_id").get(getRecipeById).patch(patchRecipe).delete(deleteRecipe)

module.exports = recipesRouter;
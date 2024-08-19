const { getRecipeById } = require("../controllers/recipes-controller");

const recipesRouter = require("express").Router();

recipesRouter.route("/")
recipesRouter.route("/:recipe_id").get(getRecipeById)

module.exports = recipesRouter;
const { getListsByUsername } = require("../../controllers/lists-controllers");
const {
  getUserByUsername,
  postNewUser,
  getRecipesByUsername,
  postListToUser,
} = require("../controllers/users-controller");

const usersRouter = require("express").Router();
usersRouter.route("/").post(postNewUser);
usersRouter.route("/:username").get(getUserByUsername);
usersRouter
  .route("/:username/lists")
  .get(getListsByUsername)
  .post(postListToUser);
usersRouter.route("/:username/recipes").get(getRecipesByUsername);

module.exports = usersRouter;

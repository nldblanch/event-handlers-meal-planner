const { getListsByUserId } = require("../controllers/lists-controllers");
const {
  getUserByUserId,
  postNewUser,
  postListToUser,
  deleteListFromUser,
  postRecipeToUser,
  getRecipesByUserId,
} = require("../controllers/users-controller");

const usersRouter = require("express").Router();
usersRouter.route("/").post(postNewUser);
usersRouter.route("/:user_id").get(getUserByUserId);
usersRouter
  .route("/:user_id/lists")
  .get(getListsByUserId)
  .post(postListToUser)
  .delete(deleteListFromUser);
usersRouter.route("/:user_id/recipes").get(getRecipesByUserId).post(postRecipeToUser);


module.exports = usersRouter;

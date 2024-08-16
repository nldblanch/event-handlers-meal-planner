const { getUserByUsername, postNewUser } = require("../controllers/users-controller");

const usersRouter = require("express").Router();
usersRouter.route("/").post(postNewUser)
usersRouter.route("/:username").get(getUserByUsername)

module.exports = usersRouter;
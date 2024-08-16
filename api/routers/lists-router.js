const { getListsByUsername } = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:username", getListsByUsername);

module.exports = listsRouter;

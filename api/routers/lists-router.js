const {
  getListsByUsername,
  getListById,
} = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:list_id", getListById);

module.exports = listsRouter;

const {
  getListsByUsername,
  getListById,
  patchList,
} = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:list_id", getListById);

listsRouter.patch("/:list_id", patchList);

module.exports = listsRouter;

const {
  getListsByUsername,
  getListById,
  patchList,
  postList,
} = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:list_id", getListById);

listsRouter.patch("/:list_id", patchList);

listsRouter.post("/", postList);

module.exports = listsRouter;

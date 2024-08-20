const {
  getListById,
  patchList,
  postList,
  postItem,
} = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:list_id", getListById);

listsRouter.patch("/:list_id", patchList);

listsRouter.post("/", postList);

listsRouter.post("/:list_id", postItem);

module.exports = listsRouter;

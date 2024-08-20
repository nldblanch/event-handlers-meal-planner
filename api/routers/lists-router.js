const {
  getListById,
  patchList,
  postList,
  postItem,
  deleteList,
} = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:list_id", getListById);

listsRouter.patch("/:list_id", patchList);

listsRouter.post("/", postList);

listsRouter.post("/:list_id", postItem);

listsRouter.delete("/:list_id", deleteList);

module.exports = listsRouter;

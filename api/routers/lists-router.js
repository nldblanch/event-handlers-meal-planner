const {
  getListById,
  patchList,
  postList,
  postItem,
  deleteList,
  deleteItem,
} = require("../../controllers/lists-controllers");

const listsRouter = require("express").Router();

listsRouter.route("/");

listsRouter.get("/:list_id", getListById);

listsRouter.patch("/:list_id", patchList);

listsRouter.post("/", postList);

listsRouter.post("/:list_id", postItem);

listsRouter.delete("/:list_id", deleteList);

listsRouter.delete("/:list_id/:item_index", deleteItem);

module.exports = listsRouter;

const apiRouter = require("express").Router();

const { users, lists, recipes } = require("./index");

apiRouter.use("/users", users);
apiRouter.use("/lists", lists);
apiRouter.use("/recipes", recipes);
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;

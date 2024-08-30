const apiRouter = require("express").Router();

const { getEndpoints } = require("../controllers/endpoints-controller")
const { users, lists, recipes } = require("./index");

apiRouter.use("/users", users);
apiRouter.use("/lists", lists);
apiRouter.use("/recipes", recipes);
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;

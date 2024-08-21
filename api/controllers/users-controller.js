const {
  fetchUserByUserId,
  addUserToDatabase,
  addListToUser,
  removeListfromUser,
  addRecipeToUser,
  fetchRecipesByUserId
} = require("../models/users-model");

exports.getUserByUserId = (request, response, next) => {
  const { user_id } = request.params;
  fetchUserByUserId(user_id)
    .then((user) => {
      response.status(200).send({ user });
    })
    .catch(next);
};

exports.getRecipesByUserId = (request, response, next) => {
  const { user_id } = request.params;
  fetchRecipesByUserId(user_id)
    .then((recipes) => {
      response.status(200).send({ recipes });
    })
    .catch(next);
};

exports.postNewUser = (request, response, next) => {
  const user = request.body;
  addUserToDatabase(user)
    .then((user) => {
      response.status(201).send({ user });
    })
    .catch(next);
};

exports.postListToUser = (request, response, next) => {
  const { user_id } = request.params;
  const { list_id } = request.body;
  addListToUser(user_id, list_id)
    .then((user) => {
      response.status(201).send({ user });
    })
    .catch(next);
};

exports.deleteListFromUser = (request, response, next) => {
  const { user_id } = request.params;
  const { list_id } = request.body;
  removeListfromUser(user_id, list_id)
    .then((user) => {      
      response.status(200).send({ user });
    })
    .catch(next);
};

exports.postRecipeToUser = (request, response, next) => {
  const { user_id } = request.params;
  const recipe = request.body;
  addRecipeToUser(user_id, recipe)
  .then((recipe) => {      
    response.status(201).send({ recipe });
  })
  .catch(next);
}

const {
  fetchUserByUsername,
  addUserToDatabase,
} = require("../models/users-model");

exports.getUserByUsername = (request, response, next) => {
  const { username } = request.params;
  fetchUserByUsername(username)
    .then((user) => {
      response.status(200).send({ user });
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

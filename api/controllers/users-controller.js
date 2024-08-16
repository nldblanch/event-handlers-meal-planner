const { fetchUserByUsername } = require("../models/users-model");

exports.getUserByUsername = (request, response, next) => {
  const { username } = request.params;
  fetchUserByUsername(username)
    .then((user) => {        
      response.status(200).send({ user });
    })
    .catch(next);
};

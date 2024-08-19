const {
  fetchListsByUsername,
  fetchListById,
} = require("../models/lists-models");

exports.getListsByUsername = (request, resposne, next) => {
  const { username } = request.params;
  fetchListsByUsername(username)
    .then((lists) => {
      resposne.status(200).send({ lists });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getListById = (request, response, next) => {
  const { list_id } = request.params;
  fetchListById(list_id)
    .then((list) => {
      response.status(200).send({ list });
    })
    .catch((err) => {
      next(err);
    });
};

const { request } = require("../app");
const {
  fetchListsByUserId,
  fetchListById,
  updateList,
  addList,
  addItem,
  removeList,
  removeItem,
} = require("../models/lists-models");

exports.getListsByUserId = (request, resposne, next) => {
  const { user_id } = request.params;
  fetchListsByUserId(user_id)
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

exports.patchList = (request, response, next) => {
  const { list_id } = request.params;
  const { list_name, isPrivate } = request.body;
  updateList(list_id, list_name, isPrivate)
    .then((data) => {
      response.status(200).send({ list: data });
    })
    .catch((err) => {
      if (err.code === "not-found") {
        next({ status: 404, message: "List not found" });
      }
      next(err);
    });
};

exports.postList = (request, response, next) => {
  const { list_name, isPrivate } = request.body;
  addList(list_name, isPrivate)
    .then((list) => {
      response.status(201).send({ list });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postItem = (request, response, next) => {
  const { list_id } = request.params;
  const { item_name, amount } = request.body;
  addItem(list_id, item_name, amount)
    .then((item) => {
      response.status(201).send({ item });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteList = (request, response, next) => {
  const { list_id } = request.params;
  removeList(list_id)
    .then(() => {
      response.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteItem = (request, response, next) => {
  const { list_id, item_index } = request.params;
  removeItem(list_id, item_index)
    .then(() => {
      response.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

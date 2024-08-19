const { collection, getDoc, doc } = require("firebase/firestore");
const db = require("../db/connection");

const listRef = collection(db, "lists");
const usersRef = collection(db, "users");

exports.fetchListsByUsername = (username) => {
  return getDoc(doc(usersRef, username))
    .then((user) => {
      if (!user.data()) {
        return Promise.reject({ status: 404, message: "User not found." });
      }
      const list_ids = user.data().lists;
      lists_data = list_ids.map((id) => {
        return getDoc(doc(listRef, String(id)));
      });
      return Promise.all(lists_data);
    })
    .then((lists_data) => {
      listIdAndName = lists_data.map((list) => {
        return {
          list_id: list.id,
          list_name: list.data().list_name,
          isPrivate: list.data().isPrivate,
        };
      });
      console.log(listIdAndName);
      return listIdAndName;
    });
};

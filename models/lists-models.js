const { collection, getDoc, doc } = require("firebase/firestore");
const db = require("../db/connection");

const listRef = collection(db, "lists");
const usersRef = collection(db, "users");

exports.fetchListsByUsername = (username) => {
  return getDoc(doc(usersRef, username))
    .then((data) => {
      const list_ids = data.data().lists;
      lists_data = list_ids.map((id) => getDoc(doc(listRef, "1")));
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
      return listIdAndName;
    });
};

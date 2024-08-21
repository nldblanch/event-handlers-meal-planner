const {
  collection,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} = require("firebase/firestore");
const db = require("../db/connection");
const { list } = require("firebase/storage");

const listRef = collection(db, "lists");
const usersRef = collection(db, "users");

exports.fetchListsByUserId = (user_id) => {
  return getDoc(doc(usersRef, user_id))
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

      return listIdAndName;
    });
};

exports.fetchListById = (list_id) => {
  const docRef = doc(listRef, list_id);
  return getDoc(docRef).then((list) => {
    if (!list.exists()) {
      return Promise.reject({ status: 404, message: "List not found" });
    }
    const listInfo = list.data();
    listInfo.list_id = list_id;
    listItems = listInfo.list.map((item) => {
      const copy = { ...item };
      copy.amount = Number(copy.amount);
      return copy;
    });
    delete listInfo[list];
    listInfo.items = listItems;

    return listInfo;
  });
};

exports.updateList = (list_id, list_name, isPrivate) => {
  const docRef = doc(listRef, list_id);
  if (list_name && isPrivate) {
    if (!(typeof list_name === "string") || !(typeof isPrivate === "boolean")) {
      return Promise.reject({ status: 400, message: "Incorrect data type" });
    }
    return updateDoc(docRef, { list_name, isPrivate }).then(() => {
      return { list_name, list_id, isPrivate };
    });
  }
  if (list_name) {
    if (!(typeof list_name === "string")) {
      return Promise.reject({
        status: 400,
        message: "Incorrect data type for list_name",
      });
    }
    return updateDoc(docRef, { list_name }).then(() => {
      return { list_name, list_id };
    });
  }
  if (isPrivate) {
    if (!(typeof isPrivate === "boolean")) {
      return Promise.reject({
        status: 400,
        message: "Incorrect data type for isPrivate",
      });
    }
    return updateDoc(docRef, { isPrivate }).then(() => {
      return { isPrivate, list_id };
    });
  }
  return Promise.reject({
    status: 400,
    message: "Incorrect format for request body",
  });
};

exports.addList = (list_name, isPrivate) => {
  if (typeof list_name !== "string" || typeof isPrivate !== "boolean") {
    return Promise.reject({ status: 400, message: "Invalid data type" });
  }
  return addDoc(listRef, { list_name, isPrivate, list: [] }).then(
    (createdList) => {
      const listInfo = {
        list_name,
        isPrivate,
        list_id: createdList.id,
        list: [],
      };
      return listInfo;
    }
  );
};

exports.addItem = (list_id, item_name, amount) => {
  if (typeof item_name !== "string" || typeof amount !== "number") {
    return Promise.reject({ status: 400, message: "Invalid data type" });
  }
  const docRef = doc(listRef, list_id);
  return getDoc(docRef)
    .then((listSnap) => {
      if (!listSnap.exists()) {
        return Promise.reject({ status: 404, message: "List not found" });
      }
      const currItems = listSnap.data().list;
      currItems.push({ item_name, amount });
      return updateDoc(docRef, { list: currItems });
    })
    .then(() => {
      return { item_name, amount };
    });
};

exports.removeList = (list_id) => {
  const docRef = doc(listRef, list_id);
  return getDoc(docRef).then((snapShot) => {
    if (snapShot.exists()) {
      return deleteDoc(docRef);
    } else {
      return Promise.reject({ status: 404, message: "List not found" });
    }
  });
};

exports.removeItem = (list_id, item_index) => {
  const docRef = doc(listRef, list_id);
  return getDoc(docRef).then((snapshot) => {
    if (!snapshot.exists()) {
      return Promise.reject({ status: 404, message: "List not found" });
    }
    const currItems = snapshot.data().list;
    if (currItems[item_index] === undefined) {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
    const removedItem = currItems.filter(
      (item, index) => index !== Number(item_index)
    );
    return updateDoc(docRef, { list: removedItem });
  });
};

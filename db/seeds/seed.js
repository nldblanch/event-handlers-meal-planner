const {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} = require("firebase/firestore");
const db = require("../connection");
const data = require("../data/test-data");

const seed = ({ shoppingItems, recipes, users }) => {
  const colRef = collection(db, "users");
  getDocs(colRef)
    .then((res) => {
      const user_ids = res.docs.map((document) => {
        return deleteDoc(doc(db, "users", document.id));
      });
      return Promise.all(user_ids);
    })
    .then(() => {
      const promiseArray = [];
      users.forEach(({ first_name, last_name, email, password }) => {
        promiseArray.push(
          addDoc(colRef, { first_name, last_name, email, password })
        );
      });
      return Promise.all(promiseArray);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  //drop table lists
  //drop table recipes
  //drop table users
  //create users
  //create recipes
  //create lists
  //insert into users
  //insert into recipes
  //insert into lists
};
seed(data);

const { collection, getDocs, doc, setDoc } = require("firebase/firestore");
const db = require("../../db/connection");

exports.fetchUserByUsername = (username) => {
  const colRef = collection(db, "users");

  return getDocs(colRef).then((res) => {
    const user = res.docs.filter((doc) => {
      return doc.id === username;
    })[0];
    if (!user)
      return Promise.reject({ status: 404, message: "User not found." });
    else return user.data();
  });
};

exports.addUserToDatabase = (user) => {
  const greenlist = [
    "email",
    "first_name",
    "last_name",
    "password",
    "username",
  ];
  const keys = Object.keys(user);
  for (let key of keys) {
    if (!greenlist.includes(key)) {
      return Promise.reject({
        status: 400,
        message: "Bad request - invalid key on object.",
      });
    }
  }
  if (keys.length !== 5)
    return Promise.reject({
      status: 400,
      message: "Bad request - key missing on object.",
    });
  return this.checkUsernameExists(user.username)
    .then((username) => {
      if (username)
        return Promise.reject({
          status: 400,
          message: "Bad request - username already taken.",
        });

      user.lists = [];
      user.recipes = [];

      const usersRef = collection(db, "users");
      const docRef = doc(usersRef, user.username);

      return setDoc(docRef, user);
    })
    .then(() => {
      return this.fetchUserByUsername(user.username);
    });
};
exports.checkUsernameExists = (username) => {
  const colRef = collection(db, "users");
  return getDocs(colRef).then((res) => {
    const user = res.docs.filter((doc) => {
      return doc.id === username;
    })[0];
    return user;
  });
};

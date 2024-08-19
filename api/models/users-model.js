const {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore");
const db = require("../../db/connection");

exports.fetchUserByUsername = (username) => {
  const colRef = collection(db, "users");

  return getDoc(doc(colRef, username)).then((user) => {
    if (!user.data())
      return Promise.reject({ status: 404, message: "User not found." });
    else return user.data();
  });
};

exports.fetchRecipesByUsername = (username) => {
  const usersRef = collection(db, "users");
  const recipesRef = collection(db, "recipes");
  return getDoc(doc(usersRef, username)).then((user) => {
    if (!user.data()) {
      return Promise.reject({ status: 404, message: "User not found." });
    }
    const recipes = user.data().recipes.map((recipeId) => {
      return getDoc(doc(recipesRef, String(recipeId)));
    });
    return Promise.all(recipes).then((recipesData) => {
      return recipesData.map((recipe) => {
        return {
          recipe_id: recipe.id,
          ...recipe.data(),
        };
      });
    });
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

exports.addListToUser = (username, list_id) => {
  if (!list_id) {
    return Promise.reject({
      status: 400,
      message: "Bad request - invalid key on object.",
    });
  }
  if (typeof list_id !== "number") {
    return Promise.reject({
      status: 400,
      message: "Bad request - invalid data type.",
    });
  }
  const userRef = collection(db, "users");
  return this.fetchUserByUsername(username)
    .then((user) => {
      if (user.lists.includes(list_id)) {
        return Promise.reject({
          status: 400,
          message: "Bad request - list already assigned to user.",
        });
      }
      const docRef = doc(userRef, username);
      const newLists = [...user.lists, list_id];
      return Promise.all([
        { ...user, lists: newLists },
        updateDoc(docRef, "lists", newLists),
      ]);
    })
    .then(([user]) => {
      return user;
    });
};

exports.removeListfromUser = (username, list_id) => {
  if (!list_id) {
    return Promise.reject({
      status: 400,
      message: "Bad request - invalid key on object.",
    });
  }
  if (typeof list_id !== "number") {
    return Promise.reject({
      status: 400,
      message: "Bad request - invalid data type.",
    });
  }
  
  const userRef = collection(db, "users");
  
  return this.fetchUserByUsername(username)
  .then((user) => {
    if (!user.lists.includes(list_id)) {
      return Promise.reject({
        status: 400,
        message: "Bad request - list not assigned to user.",
      });
    }
    const docRef = doc(userRef, username);
    const { lists } = user;   
    const newLists = lists.filter((element) => {
      return element !== list_id
    })    
    return Promise.all([
      { ...user, lists: newLists },
      updateDoc(docRef, "lists", newLists),
    ]);
  })
  .then(([user]) => {        
    return user;
  });
};

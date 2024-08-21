const {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
} = require("firebase/firestore");
const db = require("../../db/connection");
const { checkGreenlist } = require("../utils/greenlist");

exports.fetchUserByUserId = (user_id) => {
  const colRef = collection(db, "users");
  
  return getDoc(doc(colRef, user_id)).then((user) => {
    if (!user.exists())
      return Promise.reject({ status: 404, message: "User not found." });
    else {
      return {user_id, ...user.data()}
    };
  });
};

exports.fetchRecipesByUserId = (user_id) => {
  
  const usersRef = collection(db, "users");
  const recipesRef = collection(db, "recipes");
  return getDoc(doc(usersRef, user_id)).then((user) => {
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
  const keys = Object.keys(user);
  if (keys.length !== 5)
    return Promise.reject({
      status: 400,
      message: "Bad request - key missing on object.",
    });
    const greenlist = [
      "email",
      "first_name",
      "last_name",
      "avatarURL",
      "displayName",
    ];
    return checkGreenlist(greenlist, user)
    .then(() => {
      
      // return this.checkEmailExists(user.email)
      // .then((email) => {
        //   if (email)
        //     return Promise.reject({
      //       status: 400,
      //       message: "Bad request - email already exists.",
      //     });
      
      user.lists = [];
      user.recipes = [];
      
      const usersRef = collection(db, "users");
      
      return addDoc(usersRef, user);
    })
    // })
    .then((user) => {
      
      
      
      return this.fetchUserByUserId(user.id);
    });
};
// exports.checkEmailExists = (email) => {
//   const colRef = collection(db, "users");
//   return getDocs(colRef).then((res) => {
//     const user = res.docs.filter((doc) => {
//       return doc.id === username;
//     })[0];
//     return user;
//   });
// };

exports.addListToUser = (user_id, list_id) => {
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
  return this.fetchUserByUserId(user_id)
    .then((user) => {
      if (user.lists.includes(list_id)) {
        return Promise.reject({
          status: 400,
          message: "Bad request - list already assigned to user.",
        });
      }
      const docRef = doc(userRef, user_id);
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

exports.removeListfromUser = (user_id, list_id) => {
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

  return this.fetchUserByUserId(user_id)
    .then((user) => {
      if (!user.lists.includes(list_id)) {
        return Promise.reject({
          status: 400,
          message: "Bad request - list not assigned to user.",
        });
      }
      const docRef = doc(userRef, user_id);
      const { lists } = user;
      const newLists = lists.filter((element) => {
        return element !== list_id;
      });
      return Promise.all([
        { ...user, lists: newLists },
        updateDoc(docRef, "lists", newLists),
      ]);
    })
    .then(([user]) => {
      return user;
    });
};

exports.addRecipeToUser = (user_id, recipe) => {
  const recipeRef = collection(db, "recipes");
  const keys = Object.keys(recipe);
  if (keys.length !== 5)
    return Promise.reject({
      status: 400,
      message: "Bad request - key missing on object.",
    });
  const greenlist = [
    "cook_time",
    "ingredients",
    "instructions",
    "prep_time",
    "recipe_name",
  ];
  return checkGreenlist(greenlist, recipe)
    .then(() => {
      return this.fetchUserByUserId(user_id);
    })

    .then((user) => {
      return Promise.all([
        addDoc(recipeRef, { ...recipe, created_by: user_id }),
        user.recipes,
      ]);
    })
    .then(([result, userRecipes]) => {
      const userRef = collection(db, "users");
      const docRef = doc(userRef, user_id);

      const newRecipes = [...userRecipes, result.id];

      return Promise.all([
        { recipe_id: result.id, ...recipe, created_by: user_id },
        updateDoc(docRef, "recipes", newRecipes),
      ]).then(([recipe]) => {
        return recipe;
      });
    });
};

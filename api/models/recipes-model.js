const {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const {checkGreenlist} = require("../utils/greenlist");
const db = require("../../db/connection");

exports.fetchRecipeById = (id) => {
  const colRef = collection(db, "recipes");

  return getDoc(doc(colRef, id)).then((recipe) => {
    if (!recipe.data())
      return Promise.reject({ status: 404, message: "Recipe not found." });
    else
      return {
        recipe_id: recipe.id,
        ...recipe.data(),
      };
  });
};

exports.updateRecipe = (id, patchInfo) => {
  const colRef = collection(db, "recipes");
  const docRef = doc(colRef, id);
  const fields = Object.keys(patchInfo);
  if (fields.length === 0) {
    return Promise.reject({
      status: 400,
      message: "Bad request - no key on object.",
    });
  }
  const greenlist = [
    "cook_time",
    "ingredients",
    "instructions",
    "prep_time",
    "recipe_name",
  ];
  return checkGreenlist(greenlist, patchInfo)
    .then(() => {
      return this.fetchRecipeById(id);
    })
    .then(() => {
      const patchPromiseArray = fields.map((field) => {
        return updateDoc(docRef, field, patchInfo[field]);
      });

      return Promise.all(patchPromiseArray);
    })
    .then(() => {
      return getDoc(docRef).then((recipe) => {
        return {
          recipe_id: recipe.id,
          ...recipe.data(),
        };
      });
    });
};

exports.removeRecipe = (id) => {
  const colRef = collection(db, "recipes");
  const docRef = doc(colRef, id);
  const userRef = collection(db, "users");
  return getDoc(docRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        return Promise.reject({ status: 404, message: "Recipe not found." });
      } else {
        return getDoc(doc(userRef, snapshot.data().created_by));
      }
    })
    .then((user) => {
      const { username, recipes } = user.data();
      const newRecipes = recipes.filter((element) => {
        return element !== Number(id);
      });
      return updateDoc(doc(userRef, username), "recipes", newRecipes);
    })
    .then(() => {
      return deleteDoc(docRef);
    });
};

const {
  collection,
  doc,
  getDoc,
} = require("firebase/firestore");
const db = require("../../db/connection");

exports.fetchRecipeById = (id) => {
  const colRef = collection(db, "recipes");

  return getDoc(doc(colRef, id)).then((recipe) => {
    if (!recipe.data())
      return Promise.reject({ status: 404, message: "Recipe not found." });
    else return {
        recipe_id: recipe.id,
        ...recipe.data()
    };
  });
};

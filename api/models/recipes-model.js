const { collection, doc, getDoc, updateDoc, deleteDoc } = require("firebase/firestore");
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
  return this.fetchRecipeById(id)
  .then(() => {
    const greenlist = [
      "cook_time",
      "ingredients",
      "instructions",
      "prep_time",
      "recipe_name",
    ];
    const fields = Object.keys(patchInfo);
    if (fields.length === 0) {
      return Promise.reject({
        status: 400,
        message: "Bad request - no key on object.",
      });
    }
    for (let field of fields) {
      if (!greenlist.includes(field)) {
        return Promise.reject({
          status: 400,
          message: "Bad request - invalid key on object.",
        });
      }
    }
    const patchPromiseArray = fields.map((field) => {
      return updateDoc(docRef, field, patchInfo[field]);
    });
    
    return Promise.all(patchPromiseArray)
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
  const colRef = collection(db, "recipes")
  const docRef = doc(colRef, id)
  const userRef = collection(db, "users")
  return getDoc(docRef)
  .then((snapshot) => {
    if (!snapshot.exists()) {
      return Promise.reject({ status: 404, message: "Recipe not found." });
    } else {
      return getDoc(doc(userRef, snapshot.data().created_by))
    }
  }).then((user) => {
    const {username, recipes} = user.data()    
    const newRecipes = recipes.filter((element) => {  
       
      return element !== Number(id);
    });
    return updateDoc(doc(userRef, username), "recipes", newRecipes)
    
  }).then(() => {
    return deleteDoc(docRef);
  })
  
  
}



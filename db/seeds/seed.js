const {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} = require("firebase/firestore");
const db = require("../connection");

const seed = ({ lists, recipes, users }) => {
  const listsRef = collection(db, "lists");
  const usersRef = collection(db, "users");
  const recipesRef = collection(db, "recipes");
  return dropLists(listsRef)
    .then(() => {
      return dropRecipes(recipesRef);
    })
    .then(() => {
      return dropUsers(usersRef);
    })
    .then(() => {
      return Promise.all(insertLists(listsRef, lists));
    })
    .then(() => {
      return Promise.all(insertUsers(usersRef, users));
    })
    .then(() => {
      return Promise.all(insertRecipes(recipesRef, recipes));
    })
    .catch((err) => {
      
    });
};

const dropLists = (listsRef) => {
  return getDocs(listsRef).then((res) => {
    const list_ids = res.docs.map((document) => {
      return deleteDoc(doc(db, "lists", document.id));
    });
    return Promise.all(list_ids);
  });
};
const dropRecipes = (recipesRef) => {
  return getDocs(recipesRef).then((res) => {
    const recipe_ids = res.docs.map((document) => {
      return deleteDoc(doc(db, "recipes", document.id));
    });
    return Promise.all(recipe_ids);
  });
};
const dropUsers = (usersRef) => {
  return getDocs(usersRef).then((res) => {
    const user_ids = res.docs.map((document) => {
      return deleteDoc(doc(db, "users", document.id));
    });
    return Promise.all(user_ids);
  });
};
const insertUsers = (usersRef, users) => {
  const promiseArray = [];
  users.forEach((user, index) => {
    const docRef = doc(usersRef, String(index));
    promiseArray.push(setDoc(docRef, user));
  });
  return promiseArray;
};
const insertRecipes = (recipesRef, recipes) => {
  const promiseArray = [];
  recipes.forEach((recipe, index) => {
    const docRef = doc(recipesRef, String(index));
    promiseArray.push(setDoc(docRef, recipe));
  });
  return promiseArray;
};
const insertLists = (listsRef, lists) => {
  const promiseArray = [];
  lists.forEach((list, index) => {
    const docRef = doc(listsRef, String(index));
    promiseArray.push(setDoc(docRef, list));
  });
  return promiseArray;
};

module.exports = { seed };

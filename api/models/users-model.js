const { collection, getDocs } = require("firebase/firestore");
const db = require("../../db/connection");
exports.fetchUserByUsername = (username) => {
  const colRef = collection(db, "users");

  return getDocs(colRef)
    .then((res) => {
      const user = res.docs.filter((doc) => {
        return doc.id === username;
      })[0];
      if (!user) return Promise.reject({status: 404, message: "User not found."})
      else return user.data();
    })
};

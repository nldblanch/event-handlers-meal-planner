const { collection, getDocs } = require("firebase/firestore");
const db = require("../db/connection");

const colRef = collection(db, "users");

getDocs(colRef)
  .then((res) => {
    res.docs.forEach((doc) => {
      console.log(doc.data());
    });
  })
  .catch((err) => {
    console.log(err);
  });

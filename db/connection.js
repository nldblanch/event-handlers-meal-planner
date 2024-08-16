const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = require("../firebaseConfig")

initializeApp(firebaseConfig);

module.exports = getFirestore();

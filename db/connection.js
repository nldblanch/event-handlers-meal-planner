const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`,
  });

const firebaseConfig = JSON.parse(process.env.FIREBASECONFIG)

if (!process.env.FIREBASECONFIG) {
    throw new Error("Firebase not configured.")
}

initializeApp(firebaseConfig);

module.exports = getFirestore();

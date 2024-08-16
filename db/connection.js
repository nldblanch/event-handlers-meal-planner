const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA-X0Hnnx6HOWUJiZs0Dud_3vIfBwxalXI",
  authDomain: "event-handlers-meal-planner.firebaseapp.com",
  projectId: "event-handlers-meal-planner",
  storageBucket: "event-handlers-meal-planner.appspot.com",
  messagingSenderId: "1083100969720",
  appId: "1:1083100969720:web:c2aa961a2c93e2a6a4590d",
  measurementId: "G-B7WH2Q8N4W",
};

initializeApp(firebaseConfig);

module.exports = getFirestore();

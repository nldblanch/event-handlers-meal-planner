// const { Pool } = require('pg');
// const ENV = process.env.NODE_ENV || 'development';

// require('dotenv').config({
//   path: `${__dirname}/../.env.${ENV}`,
// });

// if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
//   throw new Error("PGDATABASE or DATABASE_URL not set")
// }

// const config = {}

// if (ENV === 'production') {
//   config.connectionString = process.env.DATABASE_URL
//   config.max = 2
// }

// module.exports = new Pool(config);

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

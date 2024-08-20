const devData = require('../data/test-data');
const {seed} = require('./seed.js');
const db = require('../connection.js');
const { terminate } = require('firebase/firestore');

const runSeed = () => {
  return seed(devData).then(() => terminate(db));
};

runSeed();

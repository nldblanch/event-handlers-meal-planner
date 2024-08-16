// const app = require("../api/app.js");
const request = require("supertest");
const data = require("../db/data/test-data");
const {seed} = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const { terminate } = require("firebase/firestore")
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
    return terminate(db);
});

describe("first test", () => {
  it("does something cool", () => {
    expect(1).toBe(1)
  })
})

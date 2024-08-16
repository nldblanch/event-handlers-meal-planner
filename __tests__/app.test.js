// const app = require("../api/app.js");
const request = require("supertest");
const data = require("../db/data/test-data");
const { seed } = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const { terminate } = require("firebase/firestore");
const app = require("../api/app.js");
const endpointsJSON = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return terminate(db);
});

describe("GET: /api", () => {
  it("it responds with an object containing descriptions of all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJSON);
      });
  });
});

describe("/api/lists/:username", () => {
  it("GET: 200 it should respond with the lists (list id, isPrivate and list_name) associated for each user", () => {
    return request(app)
      .get("/api/lists/cityofgodshark")
      .expect(200)
      .then(({ body: { lists } }) => {
        expect(lists.length).toBeGreaterThan(0);
        lists.forEach((list) => {
          expect(list).toMatchObject({
            list_id: expect.any(String),
            list_name: expect.any(String),
            isPrivate: expect.any(Boolean),
          });
        });
      });
  });
  it("GET: 200 it should respond with the lists (list id, isPrivate and list_name) associated for each user", () => {
    return request(app)
      .get("/api/lists/teawalrusstorm")
      .expect(200)
      .then(({ body: { lists } }) => {
        expect(lists.length).toBeGreaterThan(0);
        lists.forEach((list) => {
          expect(list).toMatchObject({
            list_id: expect.any(String),
            list_name: expect.any(String),
            isPrivate: expect.any(Boolean),
          });
        });
      });
  });
});

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

describe("/api/users/:username/lists", () => {
  describe("GET", () => {
    it("200: it should respond with the lists (list id, isPrivate and list_name) associated for each user", () => {
      return request(app)
        .get("/api/users/cityofgodshark/lists")
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
    it("200: it should respond with the lists (list id, isPrivate and list_name) associated for each user", () => {
      return request(app)
        .get("/api/users/teawalrusstorm/lists")
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
    it("400: responds with an error when the username does not exist", () => {
      return request(app)
        .get("/api/users/Lian/lists")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("User not found.");
        });
    });
    it("200: responds with an empty array if user exists but has no lists", () => {
      return request(app)
        .get("/api/users/doryransunrise/lists")
        .expect(200)
        .then(({ body: { lists } }) => {
          expect(lists).toEqual([]);
        });
    });
  });
});

describe("/api/lists/:list_id", () => {
  describe("GET", () => {
    it("200: responds with all the list data for the corresponding list id", () => {
      return request(app)
        .get("/api/lists/1")
        .expect(200)
        .then(({ body: { list } }) => {
          expect(list.list_id).toBe("1");
          expect(list.list_name).toBe("my groceries");
          expect(list.items.length).toBeGreaterThan(0);
          list.items.forEach((item) => {
            expect(typeof item.item_name).toBe("string");
            expect(typeof item.amount).toBe("number");
          });
        });
    });
    it("404: responds with an error if the list_id does not exist", () => {
      return request(app)
        .get("/api/lists/2000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("List not found");
        });
    });
  });
});

describe("api/users/:username", () => {
  describe("GET", () => {
    it("200: responsds with user", () => {
      const username = "biscuitsabloom";
      return request(app)
        .get(`/api/users/${username}`)
        .expect(200)
        .then(({ body: { user } }) => {
          const { first_name, last_name, lists, password, recipes } = user;
          expect(user.username).toBe(username);
          expect(typeof first_name).toBe("string");
          expect(typeof last_name).toBe("string");
          expect(Array.isArray(lists)).toBe(true);
          expect(typeof password).toBe("string");
          expect(Array.isArray(recipes)).toBe(true);
        });
    });
    it("404: returns not found when user does not exist", () => {
      const username = "nottherightuser";
      return request(app)
        .get(`/api/users/${username}`)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("User not found.");
        });
    });
  });
});

describe("/api/users", () => {
  describe("POST", () => {
    it("201: responds with the created user", () => {
      const body = {
        username: "nldblanch",
        first_name: "Nathan",
        last_name: "Blanch",
        email: "saxewil683@iteradev.com",
        password: "testPassword",
      };
      return request(app)
        .post(`/api/users`)
        .send(body)
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject(body);
          const { lists, recipes } = user;
          expect(lists).toEqual([]);
          expect(recipes).toEqual([]);
        });
    });
    it("400: responds with bad request when incorrect keys given", () => {
      const body = {
        name: "nldblanch",
        first_name: "Nathan",
        last_name: "Blanch",
        email: "saxewil683@iteradev.com",
        password: "testPassword",
      };
      return request(app)
        .post(`/api/users`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - invalid key on object.");
        });
    });
    it("400: responds with bad request required keys are missing", () => {
      const body = {
        first_name: "Nathan",
        last_name: "Blanch",
        email: "saxewil683@iteradev.com",
        password: "testPassword",
      };
      return request(app)
        .post(`/api/users`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - key missing on object.");
        });
    });
    it("400: responds with bad request when user already exists", () => {
      const body = {
        username: "biscuitsabloom",
        first_name: "Nathan",
        last_name: "Blanch",
        email: "saxewil683@iteradev.com",
        password: "testPassword",
      };
      return request(app)
        .post(`/api/users`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - username already taken.");
        });
    });
  });
});

describe("/api/users/:username/recipes", () => {
  describe("GET", () => {
    it("200: returns an array of recipe objects associated with the user", () => {
      const username = "cityofgodshark";
      return request(app)
        .get(`/api/users/${username}/recipes`)
        .expect(200)
        .then(({ body: { recipes } }) => {
          expect(Array.isArray(recipes)).toBe(true);
          recipes.forEach((recipe) => {
            expect(recipe).toMatchObject({
              recipe_id: expect.any(String),
              cook_time: expect.any(Number),
              ingredients: expect.any(String),
              instructions: expect.any(String),
              prep_time: expect.any(Number),
              recipe_name: expect.any(String),
            });
          });
        });
    });
    it("200: returns an empty array when user has no recipes", () => {
      const username = "doryransunrise";
      return request(app)
        .get(`/api/users/${username}/recipes`)
        .expect(200)
        .then(({ body: { recipes } }) => {
          expect(recipes).toEqual([]);
        });
    });
    it("404: responds not found when user doesn't exist", () => {
      const username = "nottherightuser";
      return request(app)
        .get(`/api/users/${username}`)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("User not found.");
        });
    });
  });
});

describe("/api/lists/:list_id", () => {
  describe("GET", () => {
    it("200: responds with all the list data for the corresponding list id", () => {
      return request(app)
        .get("/api/lists/1")
        .expect(200)
        .then(({ body: { list } }) => {
          expect(list.list_id).toBe("1");
          expect(list.list_name).toBe("my groceries");
          expect(list.items.length).toBeGreaterThan(0);
          list.items.forEach((item) => {
            expect(typeof item.item_name).toBe("string");
            expect(typeof item.amount).toBe("number");
          });
        });
    });
    it("404: responds with an error if the list_id does not exist", () => {
      return request(app)
        .get("/api/lists/2000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("List not found");
        });
    });
  });
});


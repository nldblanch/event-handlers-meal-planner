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
  describe("PATCH", () => {
    it("200: responds with the updates list when changing the name", () => {
      return request(app)
        .patch("/api/lists/1")
        .send({ list_name: "Houseshare groceries" })
        .expect(200)
        .then(({ body: { list } }) => {
          expect(list.list_name).toBe("Houseshare groceries");
          expect(list.list_id).toBe("1");
        });
    });
    it("200: responds with the updates when only changing isPrivate Property", () => {
      return request(app)
        .patch("/api/lists/0")
        .send({ isPrivate: true })
        .expect(200)
        .then(({ body: { list } }) => {
          expect(list.isPrivate).toBe(true);
          expect(list.list_id).toBe("0");
        });
    });
    it("200: responds withthe updated fields when both name and isPrivate properties are updated", () => {
      return request(app)
        .patch("/api/lists/0")
        .send({ isPrivate: true, list_name: "my private list" })
        .expect(200)
        .then(({ body: { list } }) => {
          expect(list.list_name).toBe("my private list");
          expect(list.isPrivate).toBe(true);
          expect(list.list_id).toBe("0");
        });
    });
    it("404: responds with an error when list_id does not exist", () => {
      return request(app)
        .patch("/api/lists/2024")
        .send({ list_name: "2024 shopping" })
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("List not found");
        });
    });
    it("400: responds with err when data type in patch info is incorrect", () => {
      return request(app)
        .patch("/api/lists/0")
        .send({ isPrivate: "hello" })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Incorrect data type for isPrivate");
        });
    });
    it("400: responds with err when patchinfo is in the incorrect format", () => {
      return request(app)
        .patch("/api/lists/0")
        .send({ name: "hello" })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Incorrect format for request body");
        });
    });
  });
  describe("POST", () => {
    it("201: responds with the item object created", () => {
      return request(app)
        .post("/api/lists/1")
        .send({ item_name: "tofu", amount: 1 })
        .expect(201)
        .then(({ body: { item } }) => {
          expect(item.item_name).toBe("tofu");
          expect(item.amount).toBe(1);
        });
    });
    it("404: responds with an error when the list_id does not exist", () => {
      return request(app)
        .post("/api/lists/300")
        .send({ item_name: "tofu", amount: 1 })
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("List not found");
        });
    });
    it("400: responds with an error when the data types of the inputs are not correct", () => {
      return request(app)
        .post("/api/lists/1")
        .send({ item: "tofu", amount: "3" })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid data type");
        });
    });
  });
  describe("DELETE", () => {
    it("204: responds with no content when an list has successfully been deleted", () => {
      return request(app)
        .delete("/api/lists/0")
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        });
    });
    it("404: responds with an error when the list id doesn't exist", () => {
      return request(app)
        .delete("/api/lists/2000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("List not found");
        });
    });
  });
});

describe("/api/lists", () => {
  describe("POST", () => {
    it("201: responds with the list that has just been posted", () => {
      return request(app)
        .post("/api/lists")
        .send({ list_name: "To Do list", isPrivate: true })
        .expect(201)
        .then(({ body: { list } }) => {
          expect(list.list_name).toBe("To Do list");
          expect(list.isPrivate).toBe(true);
          expect(typeof list.list_id).toBe("string");
        });
    });
    it("400: responds with an error when the fields have an incorrect type", () => {
      return request(app)
        .post("/api/lists")
        .send({ list_name: 245, isPrivate: false })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid data type");
        });
    });
    it("400: responds with an error when the incorrect fields are provided", () => {
      return request(app)
        .post("/api/lists")
        .send({ name: 245, private: false })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid data type");
        });
    });
  });
});

describe("/api/lists/:list_id/:item_index", () => {
  describe("DELETE", () => {
    it("204: responds with 204 upon successful deletion of an item", () => {
      return request(app)
        .delete("/api/lists/0/0")
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        });
    });
    it("404: responds with an error when the list_id does not exist", () => {
      return request(app)
        .delete("/api/lists/200/1")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("List not found");
        });
    });
    it("404: responds with an error when the item index does not exist", () => {
      return request(app)
        .delete("/api/lists/0/200")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("Item not found");
        });
    });
  });
});

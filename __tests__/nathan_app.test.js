const request = require("supertest");
const data = require("../db/data/test-data");
const { seed } = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const { terminate } = require("firebase/firestore");
const app = require("../api/app.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return terminate(db);
});

describe("/api/recipes/:recipe_id", () => {
  describe("GET", () => {
    it("200: returns specified recipe", () => {
      const id = 0;
      return request(app)
        .get(`/api/recipes/${id}`)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const {
            recipe_id,
            cook_time,
            ingredients,
            instructions,
            prep_time,
            recipe_name,
          } = recipe;
          expect(recipe_id).toBe("0");
          expect(cook_time).toBe(102);
          expect(typeof ingredients).toBe("string");
          expect(typeof instructions).toBe("string");
          expect(prep_time).toBe(92);
          expect(recipe_name).toBe("Rev");
        });
    });
    it("404: returns not found when recipe id doesn't exist", () => {
        return request(app)
        .get("/api/recipes/2000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("Recipe not found.");
        });
    })
  });
});

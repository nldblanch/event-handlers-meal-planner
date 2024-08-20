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
    });
  });
  describe("PATCH", () => {
    it("200: returns the recipe after being edited", () => {
      const id = 0;
      const patchInfo = { cook_time: 100 };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
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
          expect(typeof cook_time).toBe("number");
          expect(typeof ingredients).toBe("string");
          expect(typeof instructions).toBe("string");
          expect(typeof prep_time).toBe("number");
          expect(typeof recipe_name).toBe("string");
        });
    });
    it("200: patch cook_time", () => {
      const id = 0;
      const patchInfo = { cook_time: 100 };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const { recipe_id, cook_time } = recipe;
          expect(recipe_id).toBe("0");
          expect(cook_time).toBe(100);
        });
    });
    it("200: patch ingredients", () => {
      const id = 0;
      const patchInfo = { ingredients: "eggs" };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const { recipe_id, ingredients } = recipe;
          expect(recipe_id).toBe("0");
          expect(ingredients).toBe("eggs");
        });
    });
    it("200: patch instructions", () => {
      const id = 0;
      const patchInfo = { instructions: "whisk the eggs" };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const { recipe_id, instructions } = recipe;
          expect(recipe_id).toBe("0");
          expect(instructions).toBe("whisk the eggs");
        });
    });
    it("200: patch prep_time", () => {
      const id = 0;
      const patchInfo = { prep_time: 60 };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const { recipe_id, prep_time } = recipe;
          expect(recipe_id).toBe("0");
          expect(prep_time).toBe(60);
        });
    });
    it("200: patch recipe_name", () => {
      const id = 0;
      const patchInfo = { recipe_name: "Scrambled eggs" };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const { recipe_id, recipe_name } = recipe;
          expect(recipe_id).toBe("0");
          expect(recipe_name).toBe("Scrambled eggs");
        });
    });
    it("200: patch any number of elements simultaneously", () => {
      const id = 0;
      const patchInfo = { cook_time: 15, recipe_name: "Scrambled eggs" };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(200)
        .then(({ body: { recipe } }) => {
          const { recipe_id, cook_time, recipe_name } = recipe;
          expect(recipe_id).toBe("0");
          expect(cook_time).toBe(15);
          expect(recipe_name).toBe("Scrambled eggs");
        });
    });
    it("400: refuses any keys not greenlisted", () => {
      const id = 0;
      const patchInfo = { cook_time: 15, name: "Scrambled eggs" };
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - invalid key on object.");
        });
    });
    it("400: responds bad request when no patch info given", () => {
      const id = 0;
      const patchInfo = {};
      return request(app)
        .patch(`/api/recipes/${id}`)
        .send(patchInfo)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - no key on object.");
        });
    });
    it("404: returns not found when recipe id doesn't exist", () => {
      const patchInfo = { cook_time: 15, recipe_name: "Scrambled eggs" };
      return request(app)
        .patch("/api/recipes/2000")
        .send(patchInfo)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("Recipe not found.");
        });
    });
  });
});

describe("/api/users/:username/lists", () => {
  describe("POST", () => {
    it("201: responds with the user with the given list added", () => {
      const body = { list_id: 1 };
      const testUser = {
        username: "teawalrusstorm",
        first_name: "Mariel",
        last_name: "Renard",
        email: "mrenard0@auda.org.au",
        password: "hS0$CU}P",
        lists: [0],
        recipes: [],
      };
      return request(app)
        .post(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            username: "teawalrusstorm",
            first_name: "Mariel",
            last_name: "Renard",
            email: "mrenard0@auda.org.au",
            password: "hS0$CU}P",
            lists: [0, 1],
            recipes: [],
          });
        });
    });
    it("400: responds bad request when list_id key not given", () => {
      const body = { other_key: 1 };
      const testUser = {
        username: "teawalrusstorm",
        first_name: "Mariel",
        last_name: "Renard",
        email: "mrenard0@auda.org.au",
        password: "hS0$CU}P",
        lists: [0],
        recipes: [],
      };
      return request(app)
        .post(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - invalid key on object.");
        });
    });
    it("400: responds bad request when user already has list in profile", () => {
      const body = { list_id: 1 };
      const testUser = {
        username: "cityofgodshark",
        first_name: "Tessy",
        last_name: "Teresi",
        email: "tteresi2@mtv.com",
        password: "uE9!gpj@C",
        lists: [1],
        recipes: [0, 1],
      };
      return request(app)
        .post(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - list already assigned to user.");
        });
    });
    it("400: responds bad request when invalid data type given for list", () => {
      const body = { list_id: "hello" };
      const testUser = {
        username: "cityofgodshark",
        first_name: "Tessy",
        last_name: "Teresi",
        email: "tteresi2@mtv.com",
        password: "uE9!gpj@C",
        lists: [1],
        recipes: [0, 1],
      };
      return request(app)
        .post(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - invalid data type.");
        });
    });
  });
  describe("DELETE", () => {
    it("200: removes the associated user from the list", () => {
      const body = { list_id: 1 };
      const testUser = {
        username: "cityofgodshark",
        first_name: "Tessy",
        last_name: "Teresi",
        email: "tteresi2@mtv.com",
        password: "uE9!gpj@C",
        lists: [1],
        recipes: [0, 1],
      };
      return request(app)
        .delete(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(200)
        .then(({ body: { user } }) => {
          const { lists } = user;
          expect(lists.includes(body.list_id)).toBe(false);
        });
    });
    it("400: responds bad request when list_id key not given", () => {
      const body = { other_key: 1 };
      const testUser = {
        username: "teawalrusstorm",
        first_name: "Mariel",
        last_name: "Renard",
        email: "mrenard0@auda.org.au",
        password: "hS0$CU}P",
        lists: [0],
        recipes: [],
      };
      return request(app)
        .delete(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - invalid key on object.");
        });
    });
    it("400: responds bad request when doesn't have list in profile", () => {
      const body = { list_id: 2 };
      const testUser = {
        username: "cityofgodshark",
        first_name: "Tessy",
        last_name: "Teresi",
        email: "tteresi2@mtv.com",
        password: "uE9!gpj@C",
        lists: [1],
        recipes: [0, 1],
      };
      return request(app)
        .delete(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - list not assigned to user.");
        });
    });
    it("400: responds bad request when invalid data type given for list", () => {
      const body = { list_id: "hello" };
      const testUser = {
        username: "cityofgodshark",
        first_name: "Tessy",
        last_name: "Teresi",
        email: "tteresi2@mtv.com",
        password: "uE9!gpj@C",
        lists: [1],
        recipes: [0, 1],
      };
      return request(app)
        .delete(`/api/users/${testUser.username}/lists`)
        .send(body)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request - invalid data type.");
        });
    });
  });
});

describe("api/users/:username/recipes", () => {
  describe("POST", () => {
    it("201: returns the newly created recipe", () => {
      const body = {
        cook_time: 15,
        ingredients: "eggs",
        instructions: "whisk the eggs",
        prep_time: 10,
        recipe_name: "scrambled eggs"
      }
      const username = "teawalrusstorm"
      return request(app)
      .post(`/api/users/${username}/recipes`)
      .send(body)
      .expect(201)
      .then(({body: {recipe}}) => {
        expect(recipe).toMatchObject(body)
        expect(typeof recipe.recipe_id).toBe("string")
      })
    })
    it("201: adds the recipe ID to the user who created it", () => {
      const body = {
        cook_time: 15,
        ingredients: "eggs",
        instructions: "whisk the eggs",
        prep_time: 10,
        recipe_name: "scrambled eggs"
      }
      const username = "teawalrusstorm"
      return request(app)
      .post(`/api/users/${username}/recipes`)
      .send(body)
      .expect(201)
      .then(({body: {recipe}}) => {
        return request(app)
        .get(`/api/users/${username}`)
        .expect(200)
        .then(({body: {user}}) => {
          expect(user.recipes.includes(recipe.recipe_id)).toBe(true)
        })
      })
    })
    it("400: refuses keys that are not greenlisted", () => {
      const body = {
        cook_time: 15,
        ingredients: "eggs",
        whatToDo: "whisk the eggs",
        prep_time: 10,
        recipe_name: "scrambled eggs"
      }
      const username = "teawalrusstorm"
      return request(app)
      .post(`/api/users/${username}/recipes`)
      .send(body)
      .expect(400)
      .then(({body: {message}}) => {
        expect(message).toBe("Bad request - invalid key on object.")
      })
    })
    it("400: returns bad request when one key is missing", () => {
      const body = {
        cook_time: 15,
        ingredients: "eggs",
        instructions: "whisk the eggs",
        prep_time: 10,
      }
      const username = "teawalrusstorm"
      return request(app)
      .post(`/api/users/${username}/recipes`)
      .send(body)
      .expect(400)
      .then(({body: {message}}) => {
        expect(message).toBe("Bad request - key missing on object.")
      })
    })
    it("404: returns not found when username doesn't exist", () => {
      const body = {
        cook_time: 15,
        ingredients: "eggs",
        instructions: "whisk the eggs",
        prep_time: 10,
        recipe_name: "scrambled eggs"
      }
      const username = "dinosaur"
      return request(app)
      .post(`/api/users/${username}/recipes`)
      .send(body)
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("User not found.");
        });
    });
  })
})

// describe("/api/users/:username/favourites", () => {
//   describe("POST", () => {
//     it("201: responds with the user with the newly added favourite meal", () => {
//       const body = { recipe_id: 1 };
//       const testUser = {
//         username: "teawalrusstorm",
//         first_name: "Mariel",
//         last_name: "Renard",
//         email: "mrenard0@auda.org.au",
//         password: "hS0$CU}P",
//         lists: [0],
//         recipes: [],
//       };
//       return request(app)
//         .post(`/api/users/${testUser.username}/lists`)
//         .send(body)
//         .expect(201)
//         .then(({ body: { user } }) => {
//           const {favourites} = user
//           expect(favourites).toEqual([body.recipe_id])
//         })
//     })
//   })
// })
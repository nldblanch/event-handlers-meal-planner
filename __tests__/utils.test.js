const { checkGreenlist } = require("../api/utils/greenlist")

describe("checkGreenlist", () => {
  it("returns a promise rejection when object with one key does not match greenlist with one word", () => {
    //arrange
    const object = {key: "hello"}
    const greenlist = ["allowedKey"]
    //act
    checkGreenlist(greenlist, object)
    .then(() => {
      expect(1).toBe(0)
    })
    .catch((error) => {
        //assert
        expect(error.status).toBe(400)
        expect(error.message).toBe("Bad request - invalid key on object.")
    })
  })
  it("returns a promise rejection when object with many keys does not match greenlist with one word", () => {
    //arrange
    const object = {allowedKey: "2", key: "hello"}
    const greenlist = ["allowedKey"]
    //act
    checkGreenlist(greenlist, object)
    .then(() => {
      expect(1).toBe(0)
    })
    .catch((error) => {
        //assert
        expect(error.status).toBe(400)
        expect(error.message).toBe("Bad request - invalid key on object.")
    })
  })
  it("returns a promise rejection when object with many keys does not match greenlist with many words", () => {
    //arrange
    const object = {allowedKey: "2", allowedKey2: "hello", notAllowedKey: "helloAgain"}
    const greenlist = ["allowedKey", "allowedKey2"]
    //act
    checkGreenlist(greenlist, object)
    .then(() => {
      expect(1).toBe(0)
    })
    .catch((error) => {
        //assert
        expect(error.status).toBe(400)
        expect(error.message).toBe("Bad request - invalid key on object.")
    })
  })
  it("returns a promise resolve when all keys match the greenlist", () => {
    //arrange
    const object = {allowedKey: "2", allowedKey2: "hello", allowedKey3: "helloAgain"}
    const greenlist = ["allowedKey", "allowedKey2", "allowedKey3"]
    //act
    checkGreenlist(greenlist, object)
    .then((actual) => {
        //assert
      expect(actual.passesGreenlist).toBe(true)
    })
    .catch(() => {
        expect(1).toBe(0)
    })
  })
})
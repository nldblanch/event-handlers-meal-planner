exports.checkGreenlist = (greenlist, object) => {
  const keys = Object.keys(object)
  for (let key of keys) {
    if (!greenlist.includes(key)) {
      return Promise.reject({
        status: 400,
        message: "Bad request - invalid key on object.",
      });
    }
  }
  return Promise.resolve({passesGreenlist: true})
}
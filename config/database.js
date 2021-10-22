if (process.env.NODE_ENV == "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://root:root@cluster0.ofo6a.mongodb.net/concretize?retryWrites=true&w=majority",
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/concretize",
  };
}

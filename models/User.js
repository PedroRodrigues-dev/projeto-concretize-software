const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

mongoose.model("users", User);

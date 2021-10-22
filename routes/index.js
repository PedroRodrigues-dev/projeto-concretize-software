// Modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");
const fieldValidation = require("../components/javascript/FieldValidation");
var userCode = 0;

// Initial Page GET Route
router.get("/", (req, res) => {
  res.render("index");
});

// User registration GET Route
router.get("/novo", (req, res) => {
  res.render("user/user-form", { code: userCode });
});

// User registration POST Route
router.post("/novo", (req, res) => {
  // Validation
  new fieldValidation().clean();
  new fieldValidation().name(req.body.name);
  new fieldValidation().email(req.body.email);
  new fieldValidation().cpf(req.body.cpf);
  let errors = new fieldValidation().errors();

  // Renders Errors
  if (new fieldValidation().valid()) {
    res.render("user/user-form", { errors: errors });
  } else {
    User.findOne({ email: req.body.email, cpf: req.body.cpf })
      .then((user) => {
        if (user) {
          // Validates if email already exists
          if (user.email == req.body.email) {
            req.flash("error_msg", "Já existe um usuário com este email");
            res.redirect("/novo");
          }
          // Validates if cpf already exists
          if (user.cpf == req.body.cpf) {
            req.flash("error_msg", "Já existe um usuário com este cpf");
            res.redirect("/novo");
          }
        } else {
          const newUser = new User({
            code: req.body.code,
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
          });
          newUser
            .save()
            .then(() => {
              userCode++;
              // Validates if user is successfuly created
              req.flash("success_msg", "Usuário criado com sucesso!");
              res.redirect("/");
            })
            .catch((err) => {
              // Validates if have error to create user
              req.flash("error_msg", "Houve um erro ao criar usuario");
              res.redirect("/");
            });
        }
      })
      .catch((err) => {
        // Validates if have internal error
        req.flash("error_msg", "Houve um erro interno");
        res.redirect("/");
      });
  }
});

// User delete POST Route
router.post("/deletar", (req, res) => {
  User.deleteOne({ _id: req.body.id })
    .then(() => {
      req.flash("success_msg", "Usuário deletado com sucesso!");
      res.redirect("/usuarios");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao deletar o usuário");
      res.redirect("/usuarios");
    });
});

// User List GET Route
router.get("/usuarios", (req, res) => {
  User.find()
    .then((users) => {
      res.render("user/user-list", { users: users });
    })
    .catch((err) => {
      req.flash("erros_msg", "Houve um erro ao listar os usuários");
      res.redirect("/");
    });
});

// User List POST Route
router.post("/usuarios", (req, res) => {
  filter = req.body.filters;
  search = req.body.searchBox;
  if (search == null || (filter != 1 && filter != 0)) {
    res.redirect("/usuarios");
  }
  if (filter == 0) {
    User.find({ code: search })
      .then((users) => {
        res.render("user/user-list", { users: users });
      })
      .catch((err) => {
        req.flash("erros_msg", "Houve um erro ao listar os usuários");
        res.redirect("/");
      });
  } else {
    User.find({ name: search })
      .then((users) => {
        res.render("user/user-list", { users: users });
      })
      .catch((err) => {
        req.flash("erros_msg", "Houve um erro ao listar os usuários");
        res.redirect("/");
      });
  }
});

module.exports = router;

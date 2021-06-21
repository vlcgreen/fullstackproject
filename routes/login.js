const express = require("express");
const router = express.Router();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      let records = await db.users.findAll({ where: { name: username } });
      console.log(records);

      if (records != null) {
        let record = records[0];
        bcrypt.compare(password, record.password, (err, res) => {
          if (res) {
            done(null, { id: record.id, username: record.username });
          } else {
            done(null, false);
          }
        });
      } else {
        done(null, false);
      }
    } catch (error) {}
  })
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/my_profile");
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await db.users.findByPk(id);
    done(null, user);
  } catch (err) {
    done(null, false);
  }
});

module.exports = router;

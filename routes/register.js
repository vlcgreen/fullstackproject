const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

//multer setup
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null,'./uploads')
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", upload.single("image"), async (req, res) => {
  console.log("reached register");
  try {
    //get info from header
    let { name, password, email } = req.body;

    //hash our password using bcrypt
    let passwordEncrypted = bcrypt.hashSync(password, 8);

    let data = {
      name: name,
      password: passwordEncrypted,
      roleID: 1,
      email: email,
      photo: null,
    };

    //let imagePath = null
    if (req.file) {
      data.photo = req.file.path;
    }

    //store header info in db
    //create user
    let user = await db.users.create(data);

    console.log("user", user);

    res.redirect("/login");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

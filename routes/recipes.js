const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../auth");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

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

// get all recipes
router.get("/recipes/", auth, async (req, res) => {
  console.log("id", req.query.id);
  let recipeId = req.query.id;
  let updated = req.query.updated ? 1 : 0;

  try {
    let recipeData = await db.user_recipes.findAll({
      where: { id: recipeId },
    });

    res.render("recipes", {
      recipeData: recipeData[0],
      updated: updated,
    });
  } catch (error) {
    console.error("ERROR", error);
  }
});

// POST / update user recipe
router.post("/recipes/", upload.single("image"), async (req, res) => {
  try {
    let data = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      // userID: req.body.userID,
      tag: req.body.tag,
    };

    let imagePath = null;
    if (req.file) {
      imagePath = `http://localhost:3000/${req.file.path.split("public/")[1]}`;
      data.image = imagePath;
    }

    let id = req.query.id;

    let records = await db.user_recipes.update(data, { where: { id: id } });

    res.redirect(`/recipes?id=${id}&updated=1`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

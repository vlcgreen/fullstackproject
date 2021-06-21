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

// renders the my_profile page
router.get("/my_profile", auth, async (req, res) => {
  try {
    let currentUser = req.user;
    //console.log(currentUser.id);
    if (currentUser.photo) {
      var photoPath = currentUser.photo.substring(7);
    } else {
      var photoPath = "images/avatar.jpg";
    }

    let recipeData = await db.user_recipes.findAll({
      where: { userID: req.user.id },
    });
    //get users family (or families)
    //use userID to look up familie IDs in membership table
    //Use familyIDs to get family names from family table

    let familyData = await db.membership.findAll({
      where: { userID: currentUser.id },
    });
    let familyIDs = [];
    familyData.forEach((record) => {
      familyIDs.push(record.familyID);
    });
    //console.log(familyIDs);

    //display family names
    let familyNameData = await db.family.findAll({ where: { id: familyIDs } });
    let familyNames = [];
    familyNameData.forEach((record) => {
      familyNames.push(record.familyName);
    });
    let familyPhotos = [];
    familyNameData.forEach((record) => {
      familyPhotos.push(record.familyPhoto);
    });

    console.log(familyNames);
    console.log(familyPhotos);

    //get number of recipes user has submitted
    let userRecNum = await db.user_recipes.count({
      where: { id: currentUser.id },
    });
    console.log(userRecNum);

    res.render("my_profile", {
      profliePicUrl: photoPath,
      userName: currentUser.name,
      familyNames: familyNames,
      userRecNum: userRecNum,
      email: currentUser.email,
      userRecipes: recipeData,
    });
  } catch (e) {
    console.log(e);
  }
});

// GET all user recipes //
router.get("/user_recipes", async (req, res) => {
  let recipeData = await db.user_recipes.findAll();

  res.json({ data: recipeData });
});

//   add new recipe //
router.post("/user_recipes/new", upload.single("image"), async (req, res) => {
  try {
    let data = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      userID: req.user.id,
      // image: req.body.image,
      tag: req.body.tag,
    };

    if (req.file) {
      data.image = `http://localhost:3000/${req.file.path.split("public/")[1]}`;
    }

    await db.user_recipes.create(data);

    res.redirect("/my_profile");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// DELETE recipes //

router.post("/user_recipes/delete", async (req, res) => {
  try {
    let id = req.query.id;
    console.log(id);
    let results = await db.user_recipes.destroy({ where: { id: id } });
    // let records = await db.user_recipes.findAll();
    res.redirect("/my_profile");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

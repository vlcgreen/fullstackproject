const express = require("express");
const router = express.Router();
const db = require("../models/user_recipes");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// renders the home front end page
router.get("/home", (req, res) => {
  res.send("home");
});

// GET all user recipes //
router.get("/user_recipes", async (req, res) => {

  let recipeData = await db.user_recipes.findAll();

  res.json({ data: recipeData });
});


//   add new recipe //
router.post("/user_recipes/new", async (req, res) => {
  try {
    let result = await db.user_recipes.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      image: req.body.image,
      userID: req.body.userID,
      tagID: req.body.tagID,
    });

    res.json({ data: result });
  } catch (error) {
    res.send("error");
  }
});

// PUT /user_recipes/ updating //
router.put("/user_recipes/", async (req, res) => {
  try {

    let id = req.body.id;

    let records = await db.user_recipes.update(
      {
        title: req.body.title,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        image: req.body.image,
        userID: req.body.userID,
        tagID: req.body.tagID,
      },
      { where: { id: id } }
    );

    //   if result is 0, entry was not updated, if its 1 it was
    res.json({ data: records });
  } catch (error) {
    res.send(error);
  }
});

// DELETE recipes //

router.delete("/user_recipes/delete/", async (req, res) => {
  try {
    let id = req.body.id;
    let results = await db.user_recipes.destroy({ where: { id: id } });
    let records = await db.user_recipes.findAll();
    res.json({ data: records });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

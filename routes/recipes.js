const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../auth");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/recipes/:id", auth, async (req, res) => {
  console.log("id", req.params.id);
  let recipeId = req.params.id;

  try {
    let recipeData = await db.user_recipes.findAll({
      where: { id: recipeId },
    });

    res.render("recipes", {
      recipeData: recipeData[0],
    });
  } catch (error) {
    console.error("ERROR", error);
  }
});

// POST / edit user recipe
router.post("/recipes/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let records = await db.user_recipes.update(
      {
        title: req.body.title,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        //   image: req.body.image,
        //   userID: req.body.userID,
        //   tagID: req.body.tagID,
      },
      { where: { id: id } }
    );

    res.redirect(`/recipes/${id}`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

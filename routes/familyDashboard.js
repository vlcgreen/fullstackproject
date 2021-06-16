const express = require("express");
const router = express.Router();
const db = require("../models");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// renders the home front end page
router.get("/familyDashboard", (req, res) => {
  res.send("family dashboard");
});


// GET  search family recipes
router.get("/user_recipes/familyDashboard", async (req, res) => {

  let familyID = req.body.familyID;
  // Search for family ID by name
  let record = await db.user_recipes.findAll(
    {where: {
      userID: familyID, 
    }})
    
  res.json({ data: recipeID });
});

router.get("/user_recipes", async (req, res) => {

  let recipeData = await db.user_recipes.findAll();

  res.json({ data: recipeData });
});

// search for family  id, then loop through users and find all where family id = that family id
// then find all recipes for all those users

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../models");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// renders the home front end page
router.get("/familyDashboard", (req, res) => {
  res.send("family dashboard");
});

// GET / Show all family recipes
// localhost:3000/familyDashboard/search
// then find all recipes for all those users
router.get("/familyDashboard/search", async (req, res) => {
  let familyID = req.body.familyID;
  // search for specific family id in membership and gives back all users
  let familyData = await db.membership.findAll({
    include: [
      {
        model: db.users,
        required: true,
        // include: [
        //   {
        //     model: db.user_recipes,
        //   },
        // ],
      },
    ],
    where: { familyID: familyID },
  });

  console.log("fm_data", familyData);

  // create an empty object to put the users into
  let familyRecipes = [];

  //  then loop through familyData object and reference each user ID into the recipe table and pull all relevant recipes
  // for (person of familyData) {
  //   console.log("person id", person.id);
  //   let personsRecipes = await db.user_recipes.findAll({
  //     where: { userID: person.id },
  //   });

  //   //console.log("userdata", userData[0]);

  //   familyRecipes.push(personsRecipes);

  //   // console.log(familyRecipes[1]);
  // }

  res.json(familyRecipes);
});

// GET / Search family recipe by title or category

// Post / User can give rating to a recipe and the average rating will be updated

module.exports = router;

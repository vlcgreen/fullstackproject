const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../auth");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());


// renders the home front end page
router.get("/familyDashboard",auth, (req, res) => {
  let currentUser = req.user;
  
  if(currentUser.photo){
  var photoPath = currentUser.photo.substring(7);
  console.log(photoPath);
  } else {
    var photoPath = 'images/avatar.jpg';
  }
  
  res.render("familyDashboard",{
    profliePicUrl:photoPath,
    userName:currentUser.name
  });

});

// GET / Show all family recipes
// localhost:3000/familyDashboard/search
router.get("/familyDashboard/search", async (req, res) => {
  let familyID = req.body.familyID;
  // search for specific family id in membership and gives back all users
  let familyData = await db.membership.findAll({
    // "include" creates joins
    include: [
      {
        // joining membership to users
        model: db.users,
        // creates inner join when set to true, pulls data if foreign keys are found in associated tables
        required: true,
        // joining users to user recipes
        include: [
          {
            model: db.user_recipes,
          },
        ],
      },
    ],
    where: {
      familyID: familyID,
    },
  });

  res.json(familyData);
});

// GET / Search family recipe by title or category
router.get("/familyDashboard/search-by-title", async (req, res) => {
  let familyID = req.body.familyID;
  let title = req.body.title;
  // search for specific family id in membership and gives back all users
  let familyData = await db.membership.findAll({
    // "include" creates joins
    include: [
      {
        // joining membership to users
        model: db.users,
        // creates inner join when set to true, pulls data if foreign keys are found in associated tables
        required: true,
        // joining users to user recipes
        include: [
          {
            model: db.user_recipes,
            where: {
              title: title,
            },
          },
        ],
      },
    ],
    where: {
      familyID: familyID,
    },
  });
  res.json(familyData);
});

// Post / User can give rating to a recipe and the average rating will be updated
//give me all the recipes
// join user recipes with rating table and give average rating

module.exports = router;

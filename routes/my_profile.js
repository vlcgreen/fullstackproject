const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../auth");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// renders the home front end page
router.get("/my_profile", auth, async (req, res) => {
  try {
      let currentUser = req.user;
      //console.log(currentUser.id);
      if(currentUser.photo){
      var photoPath = currentUser.photo.substring(7);
      } else {
        var photoPath = 'images/avatar.jpg';
      }

    let recipeData = await db.user_recipes.findAll({
      where: { userID: req.user.id }
      })
      //get users family (or families)
      //use userID to look up familie IDs in membership table
      //Use familyIDs to get family names from family table

      let familyData = await db.membership.findAll({where:{userID:currentUser.id}});
      let familyIDs = [];
      familyData.forEach(record =>{
        familyIDs.push(record.familyID)
      })
      //console.log(familyIDs);

      //display family names
      let familyNameData = await db.family.findAll({where:{id:familyIDs}});
      let familyNames = [];
      familyNameData.forEach(record =>{
        familyNames.push(record.familyName);
      })
      let familyPhotos = [];
      familyNameData.forEach(record =>{
        familyPhotos.push(record.familyPhoto);
      })

      console.log(familyNames);
      console.log(familyPhotos);

      //get number of recipes user has submitted
      let userRecNum = await db.user_recipes.count({where:{id:currentUser.id}});
      console.log(userRecNum);

      
      res.render("my_profile",{
          profliePicUrl:photoPath,
          userName:currentUser.name,
          familyNames:familyNames,
          userRecNum:userRecNum, 
          email: currentUser.email,
          userRecipes: recipeData
      });
}
catch(e){
  console.log(e);
}
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
      tag: req.body.tag,
    });

    res.json({ data: result });
  } catch (error) {
    res.send("error");
  }
});

// PUT /user_recipes/ updating //
router.put("/user_recipes", async (req, res) => {
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

router.delete("/user_recipes/delete", async (req, res) => {
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
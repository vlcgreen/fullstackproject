const express = require("express");
const router = express.Router();
const db = require('../models');
router.use(express.urlencoded({extended: false}));
router.use(express.json())

// renders the home front end page
router.get("/home", (req, res) => {
    res.send("home");
  });


// GET /todos
router.get('/user_recipes', async(req, res) => {
    //get all of our recipes
    let recipeData = await db.user_recipes.findAll();
  
    res.json({data: recipeData})
  
  })
  
  // GET /todos/:id
  router.get('/todos/:id', async(req, res) => {
    let id = req.params.id; 
  
    let todo = await db.user_recipes.findByPk(id);
  
    res.json({data: recipeID})
  })
  
  // POST / recipes
//   localhost:3000/user_recipes/new
  router.post('/user_recipes/new', async (req, res) => {
    try{
      let result = await db.user_recipes.create({
          title: req.body.title,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          image: req.body.image,
          userID: req.body.userID,
          tagID: req.body.tagID
        });
  
      res.json({data: result})
    }
    catch(error){
      res.send('error')
    }
  
  })
  
  // PUT /user_recipes/:id  updating
  router.put('/user_recipes/:id', async (req, res) => {
  
    try{
      //grab the id off of the url
      let id = req.params.id;
  
      let updates = await db.user_recipes.update({
        title: req.body.title,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        image: req.body.image,
        userID: req.body.userID,
        tagID: req.body.tagID
        }, {where: {id: id}});
  
      res.json({data: records})
  
    }
    catch(error){
      res.send(error)
    }
    
  })
  
  // DELETE /todos/:id
  
  router.delete('/user_recipes/delete/:id', async (req, res) => {
      try{
          let id = req.params.id;
          let results = await db.user_recipes.destroy({where: {id: id}})
          let records = await db.user_recipes.findAll();
  
          res.json({data: records});
  
      }
      catch(error){
  
        res.send(error)
      }
  
  })

module.exports = router;

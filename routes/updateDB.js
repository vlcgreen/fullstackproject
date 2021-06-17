//created file to run changes to db using queryInterface. Have not tested yet because I didn't want to make random changes to the DB - Carol


const express = require('express');
const router = express.Router();
const db = require('../models');
const queryInterface = sequelize.getQueryInterface();

router.post("/updateDB",(req,res) => {
    //use queryInterface here to make any changes you need and then comment them out once complete
    
})







module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const upload = multer({dest:'./uploads'});


// router.post('/createFamily',async(req,res) => {
//     //create new family add user as owner
//     let newGroup = await db.group.create({
//         groupName:groupName,
//     })
//     // and user and new family to mapping table linked by the ID's
//     db.group_user_map.create({
//         userID:user.id,
//         groupName:newGroup.groupName
//     })
    
// })

module.exports = router;
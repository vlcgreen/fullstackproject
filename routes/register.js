
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const multer = require('multer');
const upload = multer({dest:'./uploads'})

router.get('/register',(req, res) => {
    res.send('registation page')
})

router.post('/register',async (req, res) => {
    try{
    //get info from header
    let {username,password,photo} = req.body;
    //hash our password using bcrypt
    let passwordEncrypted = bcrypt.hashSync(password,8);

    //store header info in db
    //create user
    let user = await db.users.create({
        name:username,
        password:passwordEncrypted,
        photo:photo,
        roleID:0
    })
    res.redirect('/login');
    }
    catch(error){
        res.send(error);
    }

})

module.exports = router;
    
    
    
    
    
    
// router.post('/joinFamily',async (req,res) => {

//     let {familyName,famliyPhoto} = req.body
// 
//     //get user id off of cookie

//     if(db.family.familyName){
//         //add user to mapping table as belonging to group ID
//         //find one (first) instance group.id associated with groupName
//         let family = await db.family.findOne({where:{familyName:familyName}});
//         let familyId = family.id;
//         //add user to table
//         db.membership.create({
//             userID: user.id,
//             familyiD: familyId,
//             isApproved:false
//         });
//     } else {
//     //message : familyName doesn't exist, do you want to create a family?
//     res.redirect('/createFamily')
//     }
    
// })





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

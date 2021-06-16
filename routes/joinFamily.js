const express = require('express');
const router = express.Router();
const db = require('../models');

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

module.exports = router;
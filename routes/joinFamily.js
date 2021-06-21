const express = require('express');
const router = express.Router();
const db = require('../models');
const auth = require("../auth");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/joinFamily',auth,(req,res) => {
    res.render('joinFam');
})

router.post('/joinFamily',async (req,res) => {
    try{
    let currentFamilyName = req.body.familyName;
    //console.log(`submitted fam name ${currentFamilyName}`);
    let currentUserId = req.user.id;
    //console.log(`userId ${currentUserId}`);

    //get user id off of cookie
    console.log(db.family);

    const isFamily = await db.family.findOne({where:{familyName:currentFamilyName}});
    if(isFamily){
        res.send(`You have joined ${currentFamilyName}`)
        
        let familyId = isFamily.id;
        
        //add user to table
        db.membership.create({
            userID: currentUserId,
            familyID: familyId,
            isApproved:false
        });
    } else {
    res.send(`${currentFamilyName} doesn't exist, do you want to create a family?`)
    
    res.redirect('/addFamily')
   }
    }
    catch(e){
        console.log(e);
    }
    
})

module.exports = router;
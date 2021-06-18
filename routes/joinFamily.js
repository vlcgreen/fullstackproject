const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/joinFamily',(req,res) => {
    res.send(`
    <form action="/joinFamily" method="post">
    Family Name
    <input type="text" name="familyName" /><br>
    <input type="submit"/>
    </form>
    
    `)
})

router.post('/joinFamily',async (req,res) => {

    let currentFamilyName = req.body.familyName;
    let currentUserId = req.user.id;

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
    
    //res.redirect('/addFamily')
    }
    
})

module.exports = router;
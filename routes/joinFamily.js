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

    let {familyName} = req.body;
    let currentUserId = req.user.id;

    //get user id off of cookie

    if(db.family.familyName){
        //find one (first) instance group.id associated with groupName
        let family = await db.family.findOne({where:{familyName:familyName}});
        let familyId = family.id;
        //add user to table
        db.membership.create({
            userID: currentUserId,
            familyiD: familyId,
            isApproved:false
        });
    } else {
    res.send(`${familyName} doesn't exist, do you want to create a family?`)
    
    //res.redirect('/addFamily')
    }
    
})

module.exports = router;
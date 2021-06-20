const express = require('express');
const { Model } = require('sequelize/types');
const router = express.Router();
const db = require('../models');


router.get('/unapporvedFamMem', async (req,res) => {
    //
    //gets all family memebers for a certain family with isApproved === false
    // let unapproved = await db.membership.findAll({where:{
    //     isApproved:false,
    //     [Op.and]:{familyID:}
    //}})
    //returns that info to browser ???in JSON format???
    res.json({data:unapproved});
})

router.post('/approveFamMem:id',(req,res) => {
    //approves the family member with the given id
})



module.exports = router;
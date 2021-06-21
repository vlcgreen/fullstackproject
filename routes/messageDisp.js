const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../auth");

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/messageDisp',(req,res) => {
    let message = 
    res.render('messageDisp',{
        message:message
    });
})



module.exports = router;
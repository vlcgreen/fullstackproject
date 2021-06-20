const express = require('express');
const router = express.Router();
const db = require('../models');
const fs = require('fs');
let contactFormData = require('../data/contactData.json');


router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.get('/contact',(req,res) => {
    res.render('contact');
})


router.post('/contact',(req,res) => {
    let {name,email,comments} = req.body;
    //console.log(name,email,comments);
    let contactMessage = {
        name:name,
        email:email,
        message:comments,
    }
    //console.log(contactMessage);

    contactFormData.unshift(contactMessage);
    fs.writeFile('data/contactData.json',JSON.stringify(contactFormData),'utf8',(err)=>{
        if(err){
            console.log(err);
        }
    })
})

module.exports = router;
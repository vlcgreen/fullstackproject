
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const multer = require('multer');
const upload = multer({dest:'./uploads'});

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

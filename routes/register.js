
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');

//multer setup
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const fileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true);
    } else {
        cb(null,false);
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter});

router.get('/register',(req, res) => {
    res.send(`
    <form action="/register" method="post" enctype="multipart/form-data">
    username
    <input type="text" name="username" /><br>
    password
    <input type="text" name="password" /><br>
    <input type="file" name="image" />
    <input type="submit"/>
    </form>
    `)
})

router.post('/register',upload.single('image'),async (req, res) => {
    try{
        if(req.file){
            //res.json(req.file);
            var imagePath = req.file.path;
            //console.log(imagePath);
        } 

    //get info from header
    let {username,password} = req.body;
    //hash our password using bcrypt
    let passwordEncrypted = bcrypt.hashSync(password,8);

    //store header info in db
    //create user
    let user = await db.users.create({
        name:username,
        password:passwordEncrypted,
        photo:imagePath,
        roleID:0
    })
    res.redirect('/login');
    }
    catch(error){
        res.send(error);
    }

})

module.exports = router;
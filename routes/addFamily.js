
const express = require('express');
const router = express.Router();
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


router.get('/addFamily',(req,res) => {
    res.send(`

    <form action="/addFamily" method="post" enctype="multipart/form-data">
    Family Name
    <input type="text" name="familyName" /><br>
    
    Profile Picture<br> (.jpeg OR .png )<br>
    <input type="file" name="image" /><br><br>
    <input type="submit"/>
    </form>

    `)
})

router.post('/addFamily',upload.single('image'),async(req,res) => {
try{
    let currentUserId = req.user.id;

    if(req.file){
        //res.json(req.file);
        var imagePath = req.file.path;
        //console.log(imagePath);
    } 
    let familyName = req.body.familyName;
    
    const isFamily = await db.family.findOne({where:{familyName:familyName}});
    if(isFamily){
        res.send(`
        ${familyName} aleady exists, please choose another name
        `)
    } else {
        //create new family add user as owner
        let newFamily = await db.family.create({
            owner:currentUserId,
            familyName:familyName,
            familyPhoto:imagePath

        })
        // add user and new family to mapping table linked by the ID's
    let userMember = await db.membership.create({
            userID:currentUserId,
            familyID:newFamily.id,
            isApproved:true
        })
        //update currentUserId roleID to 1

        res.redirect("/familyDashboard")
    }
} catch(error){
    res.send(error)
}
    
})

module.exports = router;
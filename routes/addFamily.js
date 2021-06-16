
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

    let cookies = req.user;
        console.log(cookies);
    // if(req.file){
    //     //res.json(req.file);
    //     //var imagePath = req.file.path;
        
    //     
    //     //console.log(imagePath);
    //} 
    // //create new family add user as owner
    // let newGroup = await db.group.create({
    //     groupName:groupName,
    // })
    // // and user and new family to mapping table linked by the ID's
    // db.group_user_map.create({
    //     userID:user.id,
    //     groupName:newGroup.groupName
    // })
} catch(error){
    res.send(error)
}
    
})

module.exports = router;
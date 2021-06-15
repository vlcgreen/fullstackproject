//express
const express = require('express');
const router = express.Router();
//passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//database
const db = require("../models");
//bcrypt.js
const bcrypt = require('bcryptjs');


router.get('/login',(req, res) => {
    res.send('login page')
})

router.get ('/logout',(req,res) => {
    req.logOut();
    res.redirect('/')
})

passport.use(new localStrategy( async (username,password,done)=>{
    try{
        let records = await db.users.findAll({where:{username:username}});

        if(records != null){
            let record = records[0];
            bcrypt.compare(password, record.password, (err, res) => {
                if(res){
                    done(null,{id:record.id,username:record.username});
                } else {
                    done(null,false)
                }
            })

        } else {
            done(null,false)
        }

    }
    catch(error){

    }
    

}))

router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req, res) => {
    res.send('you made it through!')
    
})

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id,done) => {
    try{
        let user = await db.users.findByPk(id);
        done(null,user)
    }
    catch(err){
        done(null,false)
    }
    
})




module.exports = router;
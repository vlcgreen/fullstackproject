
const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require('bcryptjs');


router.get('/login',(req, res) => {
    res.send(`
    <form action="/login" method="post">
    username
    <input type="text" name="username" /><br>
    password
    <input type="text" name="password" /><br>
    
    <input type="submit"/>
    </form>`)
})

router.get ('/logout',(req,res) => {
    req.logOut();
    res.redirect('/')
})

passport.use(new localStrategy( async (username,password,done)=>{
    try{
        console.log('hello');
        let records = await db.users.findAll({where:{name:username}});
        console.log(records);
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
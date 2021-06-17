const express = require("express");
const app = express();
const helmet = require("helmet");
let PORT = 3000;
const cookieSession = require("cookie-session");
const passport = require("passport");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cookie- session
app.use(
  cookieSession({
    name: "session",
    keys: ["lskdfjl;sj;lasjdfl;ajsld;fjasl;djflasjdflsak"],
    maxAge: 14 * 24 * 60 * 60 * 1000,
  })
);

//public
app.use(express.static("public"));
app.use(helmet());

//views
app.set("view engine", "ejs");

// passport 
app.use(passport.initialize());
app.use(passport.session());

//routes
// app.use(require('./routes/index'));
// app.use(require("./routes/home"));
app.use(require("./routes/familyDashboard"));
// app.use(require('./routes/login'));
// app.use(require('./routes/recipes'));
// app.use(require('./routes/registration'));

app.use(require('./routes/register'));
app.use(require('./routes/login'));
app.use(require('./routes/addFamily'));
app.use(require('./routes/joinFamily'));
app.use(require('./routes/updateDB'));






app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`);
})

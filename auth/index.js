//Our own middleware. Checks to see if passport has set req.isAuthenticated if so user has logged in and is valid if not they need to login.

const authReq = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = authReq;

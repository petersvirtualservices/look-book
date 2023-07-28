
const router = require("express").Router();
const passport = require("passport");
const { isLoggedIn, LoggedIn } = require("./foreceinout");

const ClientURL = "http://localhost:3000/";
//const ClientURL = "https://look-book-act-group42.herokuapp.com/";

router.get("/login/success", isLoggedIn, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/user/facebook", isLoggedIn, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${ClientURL}profile`);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${ClientURL}profile`,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook"),
  passport.authorize("facebook", { scope: ["email"] }),
  LoggedIn
);


router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${ClientURL}profile`,
    failureRedirect: "/login/failed",
    LoggedIn
  })
);


module.exports = router;

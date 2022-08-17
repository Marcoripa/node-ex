const { Router } = require("express");
const { passport } = require("../middleware/passport");

const router = Router();

router.get("/", (req, res) => {
  console.log(req.user)
  res.sendFile("/Users/marco/node-ex/web/login.html");
});

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);


module.exports = router;

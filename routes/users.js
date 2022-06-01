const { dashboard, getRegister, getLogin, setRegister, setLogin } = require("../controllers/users")
const passport = require("passport")
const { checkAuthentification, checkNotAuthentification } = require("../middleware/authCheckup")

const router = require("express").Router()

router.route("/").get(checkAuthentification, dashboard)
router.route("/register").get(checkNotAuthentification, getRegister).post(checkNotAuthentification, setRegister)
router.route("/login").get(checkNotAuthentification, getLogin).post(checkNotAuthentification, passport.authenticate('local',{
  successRedirect:"/",
  failureRedirect:"/login",
  failureFlash: true
}))

router.delete("/logout", (req, res)=>{
  req.logOut(()=>{
    res.redirect("/login")
  })
})

module.exports = router
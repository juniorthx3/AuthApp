const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const bcrypt = require("bcrypt")

function initialize(passport){
   const authenticateUser = async (email, password, done)=>{
      const user = await User.findOne({email})
      if(user == null){
          return done(null, false, {message: "Sorry, we don't recognize this email"})
      }
      try {
          if(await bcrypt.compare(password, user.password)){
              return done(null, user)
          }else{
              return done(null, false, {message: "Password Incorrect"})
          }
      } catch (e) {
         return done(e) 
      }
   }

   const getUserById = async(id)=>{
       let data
       try {
           data = await User.findById(id)
       } catch (e) {
           console.log(e)
       }
       return data
   }

   passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
   passport.serializeUser((user, done)=> done(null, user.id))
   passport.deserializeUser((id, done)=> done(null, getUserById(id)))
}

module.exports = initialize
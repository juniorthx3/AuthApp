const express = require("express")
const dbConnection = require("./config/db")
const initializePassport = require("./config/passport")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const expressLayouts = require("express-ejs-layouts")

process.env.NODE_ENV != 'production'&& require("dotenv").config()

const app = express()
const HOST = "http://localhost"
const PORT = process.env.PORT || 3000

initializePassport(passport)

// Set Template Engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/main')

// Middleware
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

// Connection to the database
dbConnection()

//Routes
app.use('/', require("./routes/users"))

//Listener
app.listen(PORT, ()=>console.log(`Server started on ${HOST}:${PORT}`))
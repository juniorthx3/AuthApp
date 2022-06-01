const User = require("../models/User")
const bcrypt = require("bcrypt")

const dashboard = (req, res)=>{
    res.render('index')
}

const getRegister = (req, res)=>{
    res.render('register')
}

const setRegister = async (req, res)=>{
    const {name, email, password} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({name, email, password:hashedPassword})
        res.redirect("/login")
    } catch (e) {
        res.redirect("/register")
    }
}

const getLogin = (req, res)=>{
    res.render('login')
}

const setLogin = (req, res)=>{
    
}

module.exports = {dashboard, getRegister, getLogin, setRegister, setLogin}
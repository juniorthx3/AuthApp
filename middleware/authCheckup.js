
const checkAuthentification = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect("/login")
}

const checkNotAuthentification = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    return next()
}

module.exports = {checkAuthentification, checkNotAuthentification}
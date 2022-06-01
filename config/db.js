const mongoose = require("mongoose")
const colors = require("colors")

const dbConnection = async ()=>{
    try {
        const endPoint = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${endPoint.connection.host}`.cyan.underline)
    } catch (e) {
        console.log(e)
    }
}

module.exports = dbConnection
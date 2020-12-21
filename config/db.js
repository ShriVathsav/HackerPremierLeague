const mongoose = require("mongoose")
const config = require("config")

const db = config.get("mongoURI")

const MONGOURI = process.env.MONGOURI || db

const connectDB = async () => {
    try{
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        })
        console.log("MONGODB CONNECTED")
    } catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB
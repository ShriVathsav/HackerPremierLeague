const express = require("express")
const connectDB = require("./config/db")
const router = express.Router()

const app = express()

connectDB()

app.use(express.json({extended: false}))

app.get("/", (req, res) => {
    res.send("API RUNNING")
})

app.use("/api/team/", require("./routes/teamRoutes"))

router.use(function(req, res){
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

app.use(express.static("client/build"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")
const PORT = process.env.LITENOTE_WAITING_LIST_PORT
const corsOptions = require(path.join(__dirname, "config", "corsConfig"))
const waitingListRouter = require(path.join(__dirname, "routes", "waitingListRoute"))
const { errorHandler }= require(path.join(__dirname,  "middlewares", "errorHandler"))
const app = express();
app.use(express.json())
app.use(cors(corsOptions))

app.use("/api/waiting-list", waitingListRouter);
app.all("*", (req, res)=>{
    res.status(404);
    if(req.accepts("html")){
      res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if(req.accepts("json")){
      res.json({error : "404 not found"})
    }else{
      res.type("txt").send("error: 404 not found")
    }
})
app.use(errorHandler)
mongoose.connect(process.env.LITENOTE_WAITING_LIST_MONGODB_URL)
.then(()=>{
app.listen(PORT, () => {
    console.log(`Database and server is running on PORT ${PORT}`)
})
})
.catch((err) => {
    console.log(err)
    console.log("unable to connect to database")
})
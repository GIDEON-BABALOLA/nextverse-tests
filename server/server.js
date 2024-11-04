require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.LIGHTNOTE_PORT
const corsOptions = require(path.join(__dirname, "config", "corsConfig.js"))
const userRouter = require(path.join(__dirname,  "routes", "userRoute.js"))
const adminRouter = require(path.join(__dirname,  "routes", "adminRoute.js"))
const storyRouter = require(path.join(__dirname,  "routes", "storyRoute.js"))
const developerRouter = require(path.join(__dirname,  "routes", "developerRoute.js"))
const fixRouter = require(path.join(__dirname,  "routes", "fixRoute.js"))
const newsletterRouter = require(path.join(__dirname,  "routes", "newsletterRoute.js"))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/developer", developerRouter);
app.use("/api/story", storyRouter); 
app.use("/api/newsletter", newsletterRouter); 
app.use("/api/fix", fixRouter); 
mongoose.connect(process.env.LIGHTNOTE_MONGODB_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(` Connected To Database && Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error.name)
    console.log("Unable To Connect To Database")
})
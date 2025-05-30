require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const helmet = require('helmet');
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.LITENOTE_PORT
const  {corsOptions, googleCorsOptions } = require(path.join(__dirname, "config", "corsConfig.js"))
const userRouter = require(path.join(__dirname,  "routes", "userRoute.js"))
const storyRouter = require(path.join(__dirname,  "routes", "storyRoute.js"))
const noteRouter = require(path.join(__dirname,  "routes", "noteRoute.js"))
const fixRouter = require(path.join(__dirname,  "routes", "fixRoute.js"))
const newsletterRouter = require(path.join(__dirname,  "routes", "newsletterRoute.js"))
const notificationRouter = require(path.join(__dirname,  "routes", "notificationRoute.js"))
const reportRouter = require(path.join(__dirname, "routes", "reportRoute"))
const generalRouter = require(path.join(__dirname,  "routes", "generalRoute.js"))
const challengeRouter = require(path.join(__dirname,  "routes", "challengeRoute.js"))
const developerRouter = require(path.join(__dirname,  "routes", "developerRoute.js"))
const thirdPartyAuthRouter = require(path.join(__dirname,  "routes", "thirdPartyAuthRoute.js"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.set('trust proxy', 1);
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'none'; frame-ancestors 'none';"
  );
    console.log(req.path, req.method)
    next()
  })
app.use((err, req, res, next) => {
    // Handle specific error: Not allowed by CORS
    if (err.message === "Not allowed by CORS") {
      res.status(403).json({"message" : "CORS Policy Violation, Leave Now Now"}); // Use 403 for forbidden requests
    }
    else if(err.code === 'ECONNRESET'){
       res.status(504).json({ error: 'Your Request Has Timed out' });
    }
    else {
      // For other errors, pass to the default error handler
      next(err);
    }
  });
  app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "frame-ancestors": ["'self'", "https://accounts.google.com", "https://*.google.com"],
      "script-src": ["'self'", "https://accounts.google.com", "https://apis.google.com", "https://*.google.com", "'unsafe-inline'", "'unsafe-eval'"],
      "connect-src": ["'self'", "https://accounts.google.com", "https://*.google.com"],
      "style-src": ["'self'", "'unsafe-inline'"],
    }
  })
);

// Standard routes — use normal CORS
app.use("/api/user", cors(corsOptions), userRouter);
app.use("/api/story", cors(corsOptions), storyRouter);
app.use("/api/note", cors(corsOptions), noteRouter);
app.use("/api/newsletter", cors(corsOptions), newsletterRouter);
app.use("/api/notification", cors(corsOptions), notificationRouter);
app.use("/api/developer", cors(corsOptions), developerRouter);
app.use("/api/report", cors(corsOptions), reportRouter);
app.use("/api/general", cors(corsOptions), generalRouter);
app.use("/api/challenge", cors(corsOptions), challengeRouter);
app.use("/api/fix", cors(corsOptions), fixRouter);
app.use("/api/third-party-auth", cors(googleCorsOptions), thirdPartyAuthRouter); 
mongoose.connect(process.env.LITENOTE_MONGODB_LIVE_URL)
.then(() => {
      app.listen(PORT, () => {
        console.log(` Now Connected To Database && Server is now trully running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
    console.log(error.name)
    console.log(error.message)
    console.log("Database Error, Pls Try tod Fix this right now immediately")
    console.log("Unable To Connect To Database, fix this error pls")
})

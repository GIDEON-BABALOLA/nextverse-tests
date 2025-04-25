const allowedOrigins = ["http://196.223.124.161:5173", "http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "https://litenote.vercel.app"]
const path = require("path")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents"))
const corsOptions = {
  origin: function (origin, callback) {
        // use !origin during development and not during production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      logEvents(`${"CORS Error"}: ${`Not allowed by CORS, from origin ${origin}`}`, "corsError.txt", "corsError")
      callback(new Error('Not allowed by CORS'))
    }
  }, 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
  "Origin",
  "Content-Type",
  "Accept",
  "Authorization",
  "X-Request-With",
  ],
  optionsSucessStatus : 200
}
module.exports = corsOptions

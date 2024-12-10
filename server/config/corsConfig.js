const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "https://litenote.vercel.app",
  "https://nextverse-beta.vercel.app"
]
const corsOptions = {
  origin: function (origin, callback) {
        // use !origin during development and not during production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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

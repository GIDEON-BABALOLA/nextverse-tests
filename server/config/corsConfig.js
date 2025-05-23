const allowedOrigins = [
"https://litenote.app",
"https://www.litenote.app",
"http://localhost:5173",
"http://localhost:3000",
]
const allOrigins = [
"https://litenote.app",
"https://www.litenote.app",
"http://localhost:5173",
"http://localhost:3000",
"null"
]
const corsOptions = {
  origin: function (origin, callback) {  
        // use !origin during development and not during production
    if (!origin || allowedOrigins.includes(origin)) {
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
  optionsSuccessStatus: 200 
}
const googleCorsOptions = {
origin: (origin, callback) => {
  console.log("CORS Origin:", origin);
  if (allOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS for Google Callback"));
  }
},
  credentials: true,
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = {
  corsOptions,
  googleCorsOptions
}

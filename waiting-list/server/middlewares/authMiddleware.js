const rateLimit = require("express-rate-limit")
const bruteForceLimiter = rateLimit({
	windowMs:  60 * 5000, // 1 minutes
	limit: 10, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	handler: (req, res, next, options) =>
		res.status(options.statusCode).json({message : "You Have Used Too Many Different Emails"}),
})
module.exports = { bruteForceLimiter }
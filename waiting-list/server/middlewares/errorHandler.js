const { logEvents } = require("./logEvents")
const errorHandler = (err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send(err.message)
    logEvents(`${err.name}: ${err.message}`, "errLog.txt", "serverError")
    next();
}
module.exports = { errorHandler }
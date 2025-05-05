
const path = require("path")
const Challenge = require(path.join(__dirname, "..", "models", "challengeModel.js"))
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { challengeError, userError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const getAllChallenges = async (req, res) => {
    console.log("dave")
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    try{
const challenges = await Challenge.find()
.sort({createdAt : -1})
.skip(parseInt(skip))
.limit(parseInt(limit))
.lean()
const challengeCount = await Challenge.countDocuments();
res.status(200).json({
    message : "Successfully Retrieved All Challenges",
    challenges : challenges,
    challengeCount : challengeCount
})
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getAllChallengesError.txt", "challengeError")
        if(error instanceof challengeError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else if(error instanceof userError){
            return res.status(error.statusCode).json({ message : error.message})
        }
        else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}
module.exports = {
    getAllChallenges
}
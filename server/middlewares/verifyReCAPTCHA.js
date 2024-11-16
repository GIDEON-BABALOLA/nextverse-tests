//The major reason for server side verifiction of reCaptcha is because the user can run a script in the browser console,
// without having to click on the submit button and then make a request to the backend 

const axios = require("axios")
const path = require("path");
const qs = require("qs")
const { userError } = require("../utils/customError");
const { logEvents } = require(path.join(__dirname, "logEvents.js"))
const verifyReCAPTCHA = async (req, res, next) => {
    const { recaptchaToken } = req.body;
    try{
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            qs.stringify({
              secret: process.env.LITENOTE_RECAPTCHA_SERVER_SIDE_INTEGRATION_SECRET_KEY,
              response: recaptchaToken
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
if(response && response.data.success == true){
    next()
}
else{
    throw new userError("Unable To Verify ReCAPTCHA", 400)
}
    }catch(error){
logEvents(`${error.name}: ${error.message}`, "verifyreCAPTCHAError.txt", "reCAPTCHAError")
if (error instanceof userError) {
    return  res.status(error.statusCode).json({ message : error.message})
}
 else{
    return res.status(500).json({message : "Internal Server Error"})
    }

    }
}
module.exports = { verifyReCAPTCHA }
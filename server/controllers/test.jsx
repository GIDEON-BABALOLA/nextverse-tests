const forgotPasswordToken = async(req, res) =>{
    const { email } = req.body
        const user = await User.findOne({email})
        const userId = user.id
        if(!user){
            return res.status(400).json({"message": "No user found with this email", "success": "false"} )
        }
        try{
    const token = await user.createPasswordResetToken();
    console.log(token, userId);
    await user.save();
    const emailContent = await generateEmailContent({token, userId}, path.join(__dirname, "..", "ejs", "linkPasswordReset.ejs"));
    const data = {
      to: email,
      subject: 'Forgot Password Link',
      html: emailContent,
      text: 'Your forgot password link'
    };
    sendEmail(data)
    .catch((error)=>{
        logEvents(`${error.name}: ${error.message}`, "sendEmailError.txt", "user")
    })
    res.status(201).json(token)
        }catch(error){
            logEvents(`${error.name}: ${error.message}`, "forgotPasswordTokenError.txt", "user")
        }
    
    }
    const forgotPasswordVerify = async(req, res) => {
        console.log("Gideon");
        const {token} = req.params
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({
            passwordResetToken : hashedToken,
            passwordResetExpires : { $gt : Date.now()}
            // This part ensures that the user's passwordResetExpires property is greater than the current date and time. This is a check to see if the password reset token is still valid and has not expired.
        })
        if(!user){
            return res.status(401).json({"message" : "Token expired or incorrect, please try again later"})
        }
        res.status(200).json({"message": "success"})
    }
    //install code greeper
    const resetPassword = async(req, res) => {
        const {token} = req.params;
        const {password} = req.body;
        console.log(token)
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({
            passwordResetToken : hashedToken,
            passwordResetExpires : { $gt : Date.now()}
            // This part ensures that the user's passwordResetExpires property is greater than the current date and time. This is a check to see if the password reset token is still valid and has not expired.
        })
        if(!user){
            console.log("Token expired, pls try again later");
            return res.json({"message": "Token expired, please try again later", "success": false})
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        user.password = hashedPwd;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.json(user)
    
    }




    const generateOTP = async (req, res) => {
        const { email } = req.query;
        const otpExpirationTime = 60; // in seconds
        const otpTimestamp = Date.now();
        req.app.locals.OTPData = {
            otp:otpGenerator(4),
            timestamp: otpTimestamp,
            email : email
        };
        let values = req.app.locals.OTPData
        console.log(values.otp)
        const emailContent = await generateEmailContent(values, path.join(__dirname, "..", "ejs", "otpEmail.ejs"));
        const data = {
          to: email,
          subject: 'Reset Password',
          html: emailContent,
          text: 'Otp Reset Password'
      };
        sendEmail(data)
        .catch((error)=>{
            logEvents(`${error.name}: ${error.message}`, "sendEmailError.txt", "user")
        })
        res.status(201).json({ code: req.app.locals.OTPData.otp, expires_in: otpExpirationTime });
    }
    
    const verifyOTP = (req, res) => {
        const { code } = req.query;
        console.log(req.app.locals.OTPData)
        const { otp, timestamp } = req.app.locals.OTPData;
        console.log(code)
    
        const currentTime = Date.now();
        const timeDifference = (currentTime - timestamp) / 1000; // Convert to seconds
    if(timeDifference >= 30){
        req.app.locals.OTPData = {otp : null , timestamp : null, email : null}; // reset OTP data
        req.app.locals.resetSession = false;
        return res.status(401).json({"msg": "Otp Expired"})
    }
        if (parseInt(otp) === parseInt(code)) {
            req.app.locals.OTPData = {otp : null , timestamp : null}; // reset OTP data
            req.app.locals.resetSession = true;
            return res.status(200).json({ "msg": "Verification successful" });
        }
    
        return res.status(400).json({ "error": "Invalid OTP or OTP expired" });
    }
    
    const createResetSession= (req, res, next) => {
        if(req.app.locals.resetSession){
            return res.status(201).json({flag :   req.app.locals.resetSession })
        }
        return res.status(440).json({"error" : "session expired"})
        
    }
    const otpResetPassword= async (req, res) => {
        if(!req.app.locals.resetSession) return res.status(440).json({"error" : "session has expired"})
        const {password, email} = req.body;
    console.log(email);
    console.log(password)
        try{
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({"msg" : "user does not exist"})
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;
    await user.save()
    req.app.locals.resetSession = false
    req.app.locals.OTPData = {email : null}
    res.status(201).json({"msg" : "Record updated"})
        }catch(error){
    console.log(error)
    return res.json(500).json({"msg" : "Internal server error"})
        }
    }
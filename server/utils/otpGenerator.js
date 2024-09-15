const otpGenerator = (number) => {
    var otp = "";
while (otp.length < number) {
    var newDigit = Math.floor(Math.random() * 9) + 1;
       // Check if the new digit is not already in the OTP
    if (!otp.includes(newDigit.toString())) {
        otp += newDigit.toString();
    }
}
return parseInt(otp)
}
module.exports = { otpGenerator }
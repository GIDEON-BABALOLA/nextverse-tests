const validator = require("validator")
const passwordValidator = require("password-validator");
const { validatorError } = require("./customError");
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces() 
.has().symbols(1)                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); 
const validatePassword = async (password) => {
const isValid = schema.validate(password)
console.log(isValid)
if(!isValid){
    throw new validatorError("Password must contain minimum of 8 character, a lowercase and uppercase alphabet, no spaces and a minimum of 2 digits", 
        400
    )
}
}
const validateEmail = async (email) => {
    const isValid = validator.isEmail(email);
    if(!isValid){
throw new validatorError("Invalid Email", 400)
    }
}
module.exports = { validatePassword, validateEmail}
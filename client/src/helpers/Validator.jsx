import PasswordValidator from 'password-validator';

export const emailValidate = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; 
    const isEmailValid = emailRegex.test(email)
    return isEmailValid
}
export const passwordValidate = (password) => {
  // Create a schema
const schema = new PasswordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces() 
.has().symbols(1)                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);
      const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      const isValid = schema.validate(password)
      if(!password){
        return "Password Are Required"
      }else if(password.includes(" ")){
        return "Invalid Password"
      }
      else if(!isValid){
        return "Password must contain minimum of 8 character, a lowercase and uppercase alphabet, no spaces and a minimum of 1 digits"
      }
      else if(password.length < 4){
        return "Passwords Must Be Four Characters Long"
      }
      else if(!specialCharacters.test(password)){
return "Password Must Contain Special Characters"
    }
    else{
        return true
    }
}
export const mobileValidate = (mobile) => {
const mobileRegex = /^(0|\+234)(7|8|9)(0|1)\d{8}$/;
const isMobileValid = mobileRegex.test(mobile)
return isMobileValid
}
export const usernameValidate = (username) => {
  //To check for invalid characters (only alphanumeric, underscores, hyphens)
  const usernameRegex = /^[a-zA-Z0-9_-]+$/
  const isValidUsername = usernameRegex.test(username)
  return isValidUsername
}
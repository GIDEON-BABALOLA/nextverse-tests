export const emailValidate = (email) => {
    console.log("private")
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; 
    const isEmailValid = emailRegex.test(email)
    console.log(isEmailValid)
    return isEmailValid
}
export const passwordValidate = (password) => {
      const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      if(!password){
        return "Password Are Required"
      }else if(password.includes(" ")){
        return "Invalid Password"
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
const mobileRegex = /^(0|\+234)(7|8)(0|1)\d{8}$/;
const isMobileValid = mobileRegex.test(mobile)
return isMobileValid
}
export const usernameValidate = (username) => {
  //To check for invalid characters (only alphanumeric, underscores, hyphens)
  const usernameRegex = /^[a-zA-Z0-9_-]+$/
  const isValidUsername = usernameRegex.test(username)
  return isValidUsername
}
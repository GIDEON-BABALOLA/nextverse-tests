import toast from "react-hot-toast"
export async function emailValidate(values){
    const errors = emailVerify({}, values)
    return errors
}
export async function phoneNumberValidate(values){
    const errors = phoneNumberVerify({}, values)
    return errors
}
export async function passwordValidate(values){
    const errors = passwordVerify({}, values)
    return errors
}
export async function otpValidate(values){
    const errors = otpVerify({}, values)
    return errors
}
export async function totalValidate(values){

    const errors = emailVerify({}, values)
   passwordVerify(errors, values)
        return errors


}
/* Validate Register Form*/
export async function registerValidation(values){
    const errors = emailVerify({}, values)
    passwordVerify(errors, values)
    firstnameVerify(errors, values)
    lastnameVerify(errors, values)
    addressVerify(errors, values)
    countryVerify(errors, values)
    zipCodeVerify(errors, values)
    phoneNumberVerify(errors, values)
    return errors
}

/* Validate Reset Password*/
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...")
    }
    return errors
}
/* validate Profile Page */
export async function profileValidation(values){
    const errors = emailVerify({}, values)
    return errors
}
function emailVerify(error = {}, values){
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isEmailValid = emailRegex.test(values.email);
if(!values.email){
    error.email = toast.error("Email Required...!")
}else if(values.email.includes(" ")){
    error.email = toast.error("Invalid Email")
}else if(!isEmailValid){
    error.email = toast.error("Invalid Email")
}
return error
}
function otpVerify(error = {}, values){
    if(!values.otp){
        error.email = toast.error("Otp Required...!")
    }
}
/* Validate Password*/
function passwordVerify(error = {}, values){
 
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

if(!values.password){
    error.password= toast.error("Password Required...!")
}else if(values.password.includes(" ")){
    error.password = toast.error("Invalid Password")
}else if(values.password.length < 4){
    error.password = toast.error("Password Must Be More Than Four Characters Long")
}else if(!specialChars.test(values.password)){
    error.username = toast.error("Password Must Have Special Characters")
}
return error
}
function firstnameVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Username Required...!")
    }
}
function lastnameVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Username Required...!")
    }
}
function phoneNumberVerify(error = {}, values){
    const regex = /^(?:\+234\d{10}|0\d{9})$/;
  const isPhoneNumberValid = regex.test(values.phoneNumber);
    if(!values.phoneNumber){
        error.phoneNumber = toast.error("PhoneNumber Required...!")
}else if(isPhoneNumberValid){
    error.phoneNumber = toast.error("Incorrect Phone Number...!")
}
}
function addressVerify(error = {}, values){
    if(!values.address){
        error.address = toast.error("Address Required...!")
}
}
function countryVerify(error = {}, values){
    if(!values.country){
        error.country = toast.error("Country Required...!")
}else if(values.country.includes(Number)){
    error.country = toast.error("Invalid Country...!")
}
}
function zipCodeVerify(error = {}, values){
    if(!values.zipcode){
        error.zipcode = toast.error("zipcode Required...!")
}
}
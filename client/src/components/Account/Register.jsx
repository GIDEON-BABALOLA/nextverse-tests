import Input from "./Input"
import { useRegisterAccount } from "../../hooks/useRegisterAccount"
import Toast from "../common/Toast"
import { useToastContext } from "../../hooks/useToastContext"
import SpinnerLoader from "../Loaders/SpinnerLoader"
import { useEffect, useState, useRef } from "react"
import { axiosConfig } from "../../api/axiosConfig"
import GoogleAuthRedirect from "../Dashboard/common/GoogleAuthRedirect"
import { FaCheck, FaTimes } from "react-icons/fa"
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import GoogleAuth from "../Dashboard/common/GoogleAuth"
import Button from "./Button"
import useWindowSize from "../../hooks/useWindowSize"
import Recaptcha from "../common/Recaptcha"
const Register = () => {
  const { width } = useWindowSize();
  const recaptchaRef = useRef(null);
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [mobile, setMobile] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [captchaValue, setCaptchaValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastContext()
  const { registerAccount, isLoading, error, data, statusCode} = useRegisterAccount()
  useEffect(() => {
setLoading(loading)
  }, [isLoading])
  useEffect(() => {
    if(error){
      setCaptchaValue(null)
recaptchaRef.current.reset();
showToast("Error", error, false)
    }
  }, [error, showToast])

  useEffect(() => {
if(data.message){
  setCaptchaValue(null)
  recaptchaRef.current.reset();
  const { message } = data
  showToast("Success", message, true)
}
  }, [data, statusCode, showToast])
  const checkIfUsernameExists = async () => {
    setIsChecking(true)
    try{
const response = await axiosConfig.post("/user/duplicate-username", {
  username  : username
})
if(response){
  setIsChecking(false)
  setNameError(false)
}
    }catch(error){
      setNameError(true)
      setIsChecking(false)
    }
  }
  const handleRegister = (e) => {
    e.preventDefault()
    if(!captchaValue){
      showToast("Pls Click The ReCAPTCHA button", error, false)
      return;
    }
    registerAccount(email, password, mobile, username, captchaValue)
  }
    return (
      <>
      <Toast />
  <div className="litenote-register-container">
        
        <div className="litenote-register-form">
          <h2>Register</h2>
          <Input type="text" placeholder="Username" className="litenote-register-input-group" animate="&#10094;"
            value={username}
            
            onChange = {(e) => setUsername(e.target.value)}
            onKeyUp = { () => { checkIfUsernameExists() }}
          />
         {/* { isChecking && <span style={{position : "absolute", top : "122px", right : "40px"}}>
          <SpinnerLoader  width={10}/>
          </span> } */}
        <>
{ isChecking ?
          <span style={{position : "absolute", top : "122px", right : "30px"}}>
          <SpinnerLoader  width={10}/>
          </span>
         :  <span style={{position : "absolute", top : "122px", right : "40px"}}    >
          {  nameError  ?  username &&<FaTimes color="#ff5e62" style={{ position : "absolute", right : "7px", top : "3px"}}/>
       :   username && <FaCheck size={10} color="green" style={{ position : "absolute", right : "7.5px", top : "5px"}}/>
         
          }
          
          </span>
}
          </> 
          
     
          
          <Input type="email" placeholder="Email" className="litenote-register-input-group" animate="&#10095;"
             value={email}
             onChange = {(e) => setEmail(e.target.value)}
          />
          <Input type={passwordVisibility ? "text" : "password"} placeholder="Password" className="litenote-register-input-group" animate="&#10094;"
             value={password}
             onChange = {(e) => setPassword(e.target.value)}
          />
          <span     style={{position : "absolute", top : "250px", right : "40px"}}
          onClick={() => {setPasswordVisibility(!passwordVisibility)}}
          >
                 { passwordVisibility ?  <MdVisibility
                   size={15}
                     color="rgba(255, 255, 255, 0.6)"
                     style={{ position : "absolute", right : "7px", top : "3px", cursor : "pointer"}}/>
                    : 
                    <MdVisibilityOff
                   size={15}
                     color="rgba(255, 255, 255, 0.6)"
                     style={{ position : "absolute", right : "7px", top : "3px", cursor : "pointer"}}/>
                 }
          </span>
   
          <Input type="text" placeholder="Mobile Number" className="litenote-register-input-group" animate="&#10095;"
            value={mobile}
            onChange = {(e) => setMobile(e.target.value)}
          />
         <Button 
         onClick={handleRegister} isLoading={loading} text={"Register"}/>
                       <span style={{color : "white", textAlign : "center", display : "flex", flexDirection : "row",
          justifyContent : "center", alignItems : "center", padding : "5px  0px"
         }}
         >or</span>
               <div
                  style={{
                    marginBottom :"5px"
                  }}
                  >
                    { width < 1024 ? 
                  <GoogleAuth context={"signup"} setLoading={setLoading} width={290}/>
                   :
                  <GoogleAuthRedirect  width={290}  context={"signup"} setLoading={setLoading}/>
                    }
                  </div> 

<Recaptcha 
ref={recaptchaRef}
setCaptchaValue={setCaptchaValue}/>
        </div>
     
      </div>
      
      </>
      
    )
  }
  
  export default Register
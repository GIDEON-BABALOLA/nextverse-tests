import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Recaptcha from "../common/Recaptcha"
import Input from "./Input"
import Button from "./Button"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useLoginAccount } from "../../hooks/useLoginAccount"
import GoogleAuth from "../Dashboard/common/GoogleAuth"
import { useToastContext } from "../../hooks/useToastContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import Toast from "../common/Toast"
const Login = () => {
  const recaptchaRef = useRef(null);
const router =  useNavigate()
const { dispatch } = useAuthContext()
const { loginAccount, isLoading, error, data, statusCode } = useLoginAccount()
const { showToast } = useToastContext()
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [email, setEmail] = useState();
  const [check, setCheck] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null)
  const [password, setPassword] = useState();
  useEffect(() => {
    if(error){
setCaptchaValue(null)
recaptchaRef.current.reset();
showToast("Error", error, false)
    }
  }, [error, showToast])
  useEffect(() => {
  }, [captchaValue])
  useEffect(() => {
    if(data.username){
      setCaptchaValue(null)
     dispatch({type : "LOGIN", payload : data})
    recaptchaRef.current.reset();
      const { username } = data
      showToast("Success", `Welcome Back ${username}`, true)
      setTimeout(() => {
        router("/")
      }, 2000);
    }
  }, [data, statusCode, router, showToast])
  const handleLogin = (e) => {
    e.preventDefault()
    if(!captchaValue){
      showToast("Pls Click The ReCAPTCHA button", error, false)
      return;
    }
loginAccount(email, password, captchaValue)
check ? localStorage.setItem("remember-me", JSON.stringify({email, password})) : localStorage.removeItem("remember-me")
  }
  const rememberMe = () => {
    setCheck(!check)
  }
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("remember-me"))
    if(userCredentials){
        setEmail(userCredentials.email)
        setPassword(userCredentials.password)
    }
    }, [])
    return (
      <>
      <Toast />
            <div className="litenote-login-container">

      <div className="litenote-login-form">
        <h2>Lite Note</h2>
        <Input
         type="text"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Email" className="litenote-login-input-group" animate="&#10094;"/>
          <Input
          value={password}
          
          onChange={(e) => setPassword(e.target.value)}
          type={`${passwordVisibility ? "text" : "password"}`}
           placeholder="Password" className="litenote-login-input-group" animate="&#10095;"/>
          <span     style={{position : "absolute", top : "185px", right : "40px"}}
          onClick={() => {setPasswordVisibility(!passwordVisibility)}}
          >
                 { passwordVisibility ?  <MdVisibility
                   size={15}
                    color="rgba(255, 255, 255, 0.6)" style={{ position : "absolute", right : "7px", top : "3px", cursor : "pointer"}}/>
                    : 
                    <MdVisibilityOff
                   size={15}
                   color="rgba(255, 255, 255, 0.6)" style={{ position : "absolute", right : "7px", top : "3px", cursor : "pointer"}}/>
                 }
          </span>
          <div style={{display : "flex",
          marginTop : "30px",
          gap : "5px",
        
           alignItems : "center", }}>
          <input type="checkbox" className="checkmeout"
onClick={rememberMe}
          />
          <section
          style={{color : "rgba(255, 255, 255, 0.6)",}}
          >Remember me</section>
          </div>
        
        <Button
        isLoading={isLoading}
         className="litenote-login-submit-btn" onClick={handleLogin} text={"Login"}

         />
         <span style={{ textAlign : "center", display : "flex", flexDirection : "row",
          justifyContent : "center", alignItems : "center", padding : "5px  0px", color: "#dfc0bb", fontSize : "15px"
         }}
         >or</span>
         <div
         style={{
         }}
         >
         <GoogleAuth context={"signup"}/>
         </div> 
        <div className="litenote-login-register-link">
        <Link to="/register" >
        <span style={{fontSize : "1.4rem"}}>

       
        Dont have an account? Register
        </span>
        </Link>
        </div>
       <Recaptcha
       ref={recaptchaRef}
        setCaptchaValue={setCaptchaValue}/>
      </div>
    </div>
      </>
    )
  }
  
  export default Login
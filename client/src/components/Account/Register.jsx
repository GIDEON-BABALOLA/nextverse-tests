import Input from "./Input"
import { useRegisterAccount } from "../../hooks/useRegisterAccount"
import Toast from "../common/Toast"
import { useToastContext } from "../../hooks/useToastContext"
import SpinnerLoader from "../Loaders/SpinnerLoader"
import { useEffect, useState } from "react"
import { axiosConfig } from "../../api/axiosConfig"
import { FaCheck, FaTimes } from "react-icons/fa"
const Register = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [mobile, setMobile] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [nameError, setNameError] = useState(false)
  const { showToast } = useToastContext()
  const { registerAccount, isLoading, error, data, statusCode} = useRegisterAccount()
  useEffect(() => {
    if(error){
showToast("Error", error)
    }
  }, [error, showToast])
  useEffect(() => {

  }, [])
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
    registerAccount(email, password, mobile, username)
    // let settingsData = JSON.stringify({
    //   user: {
    //  username : "John Doe",
    //  email : "john.doe@example.com",
    //   },
    //   notifications : {
    //    push : false,
    //    email : false,
    //    sms : false
    //   },
    //   personalization: {
    //    darkMode  : false,
    //    stickyNoteColor : false,
    //    stickyNoteShape : false
    //   },
    //   security : {
    //    twoFactorAuthentication : false,
    //    cookiesInBrowser : false,
    //    restoreDefaultSettings : false,
    //   }
    //    })
    //      localStorage.setItem("Settings", settingsData)
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
         :  <span style={{position : "absolute", top : "122px", right : "40px"}}>
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
          <Input type="password" placeholder="Password" className="litenote-register-input-group" animate="&#10094;"
             value={password}
             onChange = {(e) => setPassword(e.target.value)}
          />
          <Input type="text" placeholder="Mobile Number" className="litenote-register-input-group" animate="&#10095;"
            value={mobile}
            onChange = {(e) => setMobile(e.target.value)}
          />
          <button className="litenote-register-submit-btn"
          onClick={handleRegister}
          >
         { isLoading ? <span style={{display : "flex", alignItems :"center", justifyContent : "center"}}>
          <SpinnerLoader width={15} />
          </span> : "Register"
         }
      
          </button>
        </div>
      </div>
      </>
      
    )
  }
  
  export default Register
import Input from "./Input"
import { useRegisterAccount } from "../../hooks/useRegisterAccount"
const Register = () => {
  const { registerAccount, isLoading, error, data, statusCode} = useRegisterAccount()
  const handleRegister = (e) => {
    console.log("ejkekek")
    e.preventDefault()
    registerAccount({ username: "John Doe", email: "john.doe@example.com", password: "password123", mobile: "1234567890" })
    let settingsData = JSON.stringify({
      user: {
     username : "John Doe",
     email : "john.doe@example.com",
      },
      notifications : {
       push : false,
       email : false,
       sms : false
      },
      personalization: {
       darkMode  : false,
       stickyNoteColor : false,
       stickyNoteShape : false
      },
      security : {
       twoFactorAuthentication : false,
       cookiesInBrowser : false,
       restoreDefaultSettings : false,
      }
       })
         localStorage.setItem("Settings", settingsData)
  }
    return (
        <div className="litenote-register-container">
        <div className="litenote-register-form">
          <h2>Register</h2>
          <Input type="text" placeholder="Username" className="litenote-register-input-group" animate="&#10094;"/>
          <Input type="email" placeholder="Email" className="litenote-register-input-group" animate="&#10095;"/>
          <Input type="password" placeholder="Password" className="litenote-register-input-group" animate="&#10094;"/>
          <Input type="password" placeholder="Confirm Password" className="litenote-register-input-group" animate="&#10095;"/>
          <Input type="text" placeholder="Mobile Number" className="litenote-register-input-group" animate="&#10095;"/>
          <button className="litenote-register-submit-btn"
          onClick={handleRegister}
          >Register</button>
        </div>
      </div>
    )
  }
  
  export default Register
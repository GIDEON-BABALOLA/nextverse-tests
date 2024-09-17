import { Link } from "react-router-dom"
import Input from "./Input"
import Button from "./Button"
const Login = () => {
  const handleLogin = () => {

  }
    return (
      <>
            <div className="litenote-login-container">
      <div className="litenote-login-form">
        <h2>Lite Note</h2>
        <Input type="text" placeholder="Username" className="litenote-login-input-group" animate="&#10094;"/>
          <Input type="password" placeholder="Password" className="litenote-login-input-group" animate="&#10095;"/>
 
        <Button className="litenote-login-submit-btn" onClick={handleLogin} text={"Login"}/>
        <div className="litenote-login-register-link">
        <Link to="/register" >Dont have an account? Register</Link>
        </div>
      </div>
    </div>
      </>
    )
  }
  
  export default Login
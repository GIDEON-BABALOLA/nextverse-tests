import Input from "./Input"
const Register = () => {
    return (
        <div className="litenote-register-container">
        <div className="litenote-register-form">
          <h2>Register</h2>
          <Input type="text" placeholder="Username" className="litenote-register-input-group" animate="&#10094;"/>
          <Input type="email" placeholder="Email" className="litenote-register-input-group" animate="&#10095;"/>
          <Input type="password" placeholder="Password" className="litenote-register-input-group" animate="&#10094;"/>
          <Input type="password" placeholder="Confirm Password" className="litenote-register-input-group" animate="&#10095;"/>
          <button className="litenote-register-submit-btn">Register</button>
        </div>
      </div>
    )
  }
  
  export default Register
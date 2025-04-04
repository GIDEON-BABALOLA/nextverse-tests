import { useRef } from "react"
import Toast from "../common/Toast"
import { useNavigate } from "react-router-dom"
import { useToastContext } from "../../hooks/useToastContext"
import SpinnerLoader from "../Loaders/SpinnerLoader"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CounterBackward from "../common/CounterBackward"
import { FaShieldAlt } from "react-icons/fa"
import Button from "./Button"
import { useVerifyAccount } from "../../hooks/useVerifyAccount"
import "../../styles/components/Account/verify.css"
import Resend from "./Resend"
const Verify = () => {
  const router = useNavigate()
  const { showToast } = useToastContext()
  const { token, email } = useParams();
  const OTPinputs = useRef([]);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [buttonActive, setButtonActive] = useState(false);
  const { verifyAccount, isLoading, error, data, statusCode} = useVerifyAccount()
  useEffect(() => {
    if(error){
showToast("Error", error, false)
    }
  }, [error, showToast])
  useEffect(() => {
    if(data.message){
      const { message } = data
      showToast("Success",
    message
         ,
          true)
      setTimeout(() => {
    router("/login")
      }, 3000)
    }
  }, [data, statusCode, showToast, router])
  useEffect(() => {
    OTPinputs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    if(String(value).length !== 2){

    newOtpValues[index] = value;

    setOtpValues(newOtpValues);
   }
          if(value){

    newOtpValues[index] = value.toString().split("").slice(-1);

    setOtpValues(newOtpValues);
   }

    const nextInput = OTPinputs.current[index + 1];

    if (value && nextInput) {
      nextInput.removeAttribute('disabled');
      nextInput.focus();
    }

    updateButtonState(newOtpValues);
  };

  const handleInputKeyUp = (index, e) => {
    if (e.key === 'Backspace') {
      const previousInput = OTPinputs.current[index - 1];

      if (previousInput) {
        OTPinputs.current[index].value = '';
        OTPinputs.current[index].setAttribute('disabled', true);
        previousInput.focus();

        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';

        setOtpValues(newOtpValues);
        updateButtonState(newOtpValues);
      }
    }
  };

  const updateButtonState = (otpValues) => {
    const isButtonActive = otpValues.every((value) => value !== ''); //true
    setButtonActive(isButtonActive);
  };
const handleVerification = (e) => {
  e.preventDefault();
  const otp = parseInt(otpValues.join(""))
  if(otp.toString().split("").length !== 4 ){
    showToast("Error", "Please Enter The Complete OTP", false)
    return
  }
verifyAccount(otp, email, token)
}


    return (
      <>
      <Toast />
  <div className="litenote-register-container">
  <div className="litenote-register-form">
  <div className="verify-icon">
  <FaShieldAlt color="white"/>
        </div>
  <h2>Verify Your Account</h2>
  <span style={{color : "white", fontFamily : "Poppins"}}>
  <b>
  Pls Enter The Four Digit OTP That Was Sent To Your Email
  </b></span>
        <form>
            <div className="form-group" style={{marginBottom : "5px"}}>
            {otpValues.map((value, index) => (
            <input className="otpInput"
              key={index}
              type="number"
              value={value}
              ref={(el) => (OTPinputs.current[index] = el)}
              onChange={(e) => handleInputChange(index, e.target.value) }
              onKeyUp={(e) => handleInputKeyUp(index, e)}
            />
          ))}
               
            </div>
        
      <Button isLoading={isLoading} text={"Verify"} 
onClick={(e) => { handleVerification(e)}}

      />
       {error && <Resend email={email} />}
   {  data.message &&  <span style={{marginTop : "10px", display : "flex",
       flexDirection : "row", alignContent : "center", justifyContent : "center",
       color : "rgba(255, 255, 255, 0.6)"
       }}>
        Redirecting To Login In&nbsp;<CounterBackward start={3}/>&nbsp;seconds
       </span>
   }
        
          
        </form>
        
  </div>   
  <div >
    </div>
    
      </div>
      </>
      
    )
  }
  
  export default Verify
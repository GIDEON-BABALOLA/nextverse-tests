import { useRef } from "react"
import { useRegisterAccount } from "../../hooks/useRegisterAccount"
import Toast from "../common/Toast"
import { useToastContext } from "../../hooks/useToastContext"
import SpinnerLoader from "../Loaders/SpinnerLoader"
import { useEffect, useState } from "react"
import { FaShieldAlt } from "react-icons/fa"
import { axiosConfig } from "../../api/axiosConfig"
import { FaCheck, FaTimes } from "react-icons/fa"
import "../../styles/components/Account/verify.css"
const Verify = () => {
  const { showToast } = useToastContext()
  const { registerAccount, isLoading, error, data, statusCode} = useRegisterAccount()
  useEffect(() => {
    if(error){
showToast("Error", error)
    }
  }, [error, showToast])
  useEffect(() => {

  }, [])
  const OTPinputs = useRef([]);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [buttonActive, setButtonActive] = useState(false);
  useEffect(() => {
    OTPinputs.current[0].focus();
  }, []);
  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    setOtpValues(newOtpValues);

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
const handleVerification = () => {
  console.log("dave")
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
            <div className="form-group">
            {otpValues.map((value, index) => (
            <input className="otpInput"
              key={index}
              type="number"
              value={value}
              ref={(el) => (OTPinputs.current[index] = el)}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyUp={(e) => handleInputKeyUp(index, e)}
            />
          ))}
               
            </div>
            <button className="litenote-register-submit-btn"
            onClick={() => handleVerification()}
          >
         { isLoading ? <span style={{display : "flex", alignItems :"center", justifyContent : "center"}}>
          <SpinnerLoader width={15} />
          </span> : "Verify"
         }
      
          </button>
        </form>
        
  </div>   
  <div >
    </div>
      </div>
      </>
      
    )
  }
  
  export default Verify
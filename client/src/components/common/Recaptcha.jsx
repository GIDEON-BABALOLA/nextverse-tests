import { forwardRef, useEffect } from "react"
import ReCAPTCHA from "react-google-recaptcha"
const Recaptcha = forwardRef(({  setCaptchaValue, message }, ref) => {
    const recaptchaSiteKey= import.meta.env.VITE_REACT_RECAPTCHA_CLIENT_SIDE_INTEGRATION_SECRET_KEY
  return (
    <div style={{display : "flex", flexDirection  : "column", justifyContent : "center", alignItems : "center", paddingTop : "10px"}}>
    <ReCAPTCHA 
    ref={ref}
    className="recaptcha-container"
    sitekey={recaptchaSiteKey} onChange={(value) => {
     setCaptchaValue(value)
    }}/>
    { message && <span className="">
    Please Click The Recaptcha Button
    </span>
    }

    </div>
  )
}
)
Recaptcha.displayName = "Recaptcha";
export default Recaptcha
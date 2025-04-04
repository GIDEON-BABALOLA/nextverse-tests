import { useResendAccountVerification } from "../../hooks/useResendAccountVerification"
import SpecialModal from "../common/SpecialModal"
import { useState, useEffect } from "react";
import { useToastContext } from "../../hooks/useToastContext";
const Resend = ({ email }) => {
 const { showToast } = useToastContext()
  const { isLoading, resendAccountVerification, error, data, statusCode } = useResendAccountVerification();
  const handleResend = () => {    
  resendAccountVerification(email)
  }
  useEffect(() => {
    if(error){
showToast("Error", error, false)
    }
  }, [error, showToast])
  useEffect(() => {
    if(data.message){
      const { message } = data
      showToast("Success", message, true)
    }
  }, [data, statusCode, showToast])
  return (
    <span 
            style={{
              display : "flex",
              justifyContent  : "center",
              marginTop : "5px",
              cursor : "pointer",
              color : "rgba(255, 255, 255, 0.6)"
            }}
            onClick={(e) => {handleResend(e)}}
          >
         { isLoading ? <span style={{display : "flex", alignItems :"center", justifyContent : "center"}}>
      Resending...
          </span> : "Resend Verification Link"
         }
      
          </span>

  )
}
 
export default Resend
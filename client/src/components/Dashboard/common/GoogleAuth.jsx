import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useGoogleAuthentication } from '../../../hooks/useGoogleAuthentication';
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useToastContext } from '../../../hooks/useToastContext';
const GoogleAuth = ({ context, setLoading, width}) => {
const router =  useNavigate()
const { googleAuthentication, isLoading, error, data,  } = useGoogleAuthentication();
const { dispatch } = useAuthContext()
const { showToast } = useToastContext();
  useEffect(() => {
    if(Object.keys(data).length !== 0){
      console.log(data)
     dispatch({type : "LOGIN", payload : data.user})
     if(context == "signup"){
       showToast("Success", `${data.message}`, true)
     }
     else{
      showToast("Success", `Welcome Back ${data.user.username}`, true)
     }
      setTimeout(() => {
        router("/")
      }, 2000);
    }
    if(error){
      showToast("Error", error, false)
    }
  }, [data, error, showToast])
const handleSuccess = (credentialResponse) => {
  console.log(credentialResponse)
 googleAuthentication(credentialResponse.credential, context)
 }
const handleError = () => {
  console.log("Login Failed")
showToast("Error", "Google Authentication Failed", false)
}
useEffect(() => {
setLoading(isLoading)
}, [isLoading])

  return (
     <GoogleLogin
         theme={"outline"}
         type='standard'
         size="large"
         text="continue_with"
         shape="rectangular"
         ux_mode='popup'
         width={width}
         logo_alignment='left'
         context={context}
         onSuccess={handleSuccess}
         onError={handleError}
     />
   );
 };
export default GoogleAuth;
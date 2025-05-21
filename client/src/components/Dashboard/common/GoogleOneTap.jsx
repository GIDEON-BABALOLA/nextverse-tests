import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useGoogleAuthentication } from '../../../hooks/useGoogleAuthentication';
import { useEffect } from 'react';
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useToastContext } from '../../../hooks/useToastContext';
import { useNavigate } from "react-router-dom"
const GoogleOneTap = () => {
  const { googleAuthentication,error, data,  } = useGoogleAuthentication();
  const { showToast } = useToastContext();
  const router =  useNavigate()
  const { dispatch } = useAuthContext()
    useEffect(() => {
      if(Object.keys(data).length !== 0){
        console.log(data)
       dispatch({type : "LOGIN", payload : data.user})
                showToast("Success", `${data.message}`, true)
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
 googleAuthentication(credentialResponse.credential, "signup")
 }
 const handleError = () => {
console.log("There is an error")
 }
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      handleSuccess(credentialResponse)
      console.log("Google One Tap Success:", credentialResponse);
      // your login/signup logic here
    },
    onError: () => {
      handleError()
    },
  });

  return null; // no UI, handled by Google
};

export default GoogleOneTap;

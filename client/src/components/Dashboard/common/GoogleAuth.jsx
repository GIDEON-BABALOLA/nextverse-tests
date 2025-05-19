import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useGoogleAuthentication } from '../../../hooks/useGoogleAuthentication';
import { useToastContext } from '../../../hooks/useToastContext';
const GoogleAuth = ({ context }) => {
const { googleAuthentication, isLoading, error, data,  } = useGoogleAuthentication();
const { showToast } = useToastContext();
useEffect(() => {
if(error){
  console.log(error)
}
if(data){
  console.log(data)
}
}, [error, data])
const clientId = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_CLIENT_ID
const handleSuccess = (credentialResponse) => {
  console.log(credentialResponse)
 googleAuthentication(credentialResponse.credential)
 }
const handleError = () => {
  console.log("Login Failed")
showToast("Error", "Google Authentication Failed", false)
}
  return (
   <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
         theme={"outline"}
         type='standard'
         size="large"
         text="continue_with"
         shape="rectangular"
         ux_mode='redirect'
         context={context}
         onSuccess={handleSuccess}
         onError={handleError}
     />
   </GoogleOAuthProvider>
   );
 };
export default GoogleAuth;
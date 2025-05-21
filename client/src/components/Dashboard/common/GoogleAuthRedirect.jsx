import { GoogleLogin} from '@react-oauth/google';
import { useToastContext } from '../../../hooks/useToastContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuth = ({ context, setLoading, width}) => {
  const LOGINURI = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_REDIRECT_URI
  const CLIENTID = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={CLIENTID}>
     <GoogleLogin
         theme={"outline"}
         type='standard'
         size="large"
         text="continue_with"
         shape="rectangular"
         ux_mode='redirect'
         width={width}
         login_uri={LOGINURI}
         logo_alignment='left'
         context={context}
     />
     </GoogleOAuthProvider>
   );
 };
export default GoogleAuth;

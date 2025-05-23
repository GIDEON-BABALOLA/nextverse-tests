// import { useGoogleOneTapLogin } from '@react-oauth/google';
// import { useGoogleAuthentication } from '../../../hooks/useGoogleAuthentication';
// import { useEffect } from 'react';
// import { useAuthContext } from "../../../hooks/useAuthContext"
// import { useToastContext } from '../../../hooks/useToastContext';
// import { useNavigate } from "react-router-dom"
// const GoogleOneTap = () => {
//   const { googleAuthentication,error, data,  } = useGoogleAuthentication();
//   const { showToast } = useToastContext();
//   const router =  useNavigate()
//   const { dispatch } = useAuthContext()
//     useEffect(() => {
//       if(Object.keys(data).length !== 0){
//         console.log(data)
//        dispatch({type : "LOGIN", payload : data.user})
//                 showToast("Success", `${data.message}`, true)
//         setTimeout(() => {
//           router("/")
//         }, 2000);
//       }
//       if(error){
//         showToast("Error", error, false)
//       }
//     }, [data, error, showToast])
//   const handleSuccess = (credentialResponse) => {
//   console.log(credentialResponse)
//  googleAuthentication(credentialResponse.credential, "signup")
//  }
//  const handleError = () => {
// console.log("There is an error")
//  }
//   useGoogleOneTapLogin({
//     onSuccess: credentialResponse => {
//       handleSuccess(credentialResponse)
//       console.log("Google One Tap Success:", credentialResponse);
//       // your login/signup logic here
//     },
//     onError: () => {
//       handleError()
//     },
//   });

//   return null; // no UI, handled by Google
// };

// export default GoogleOneTap;
import { useEffect } from 'react';
import { useGoogleAuthentication } from '../../../hooks/useGoogleAuthentication';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useToastContext } from '../../../hooks/useToastContext';
import { useNavigate } from "react-router-dom";

const CLIENT_ID = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_CLIENT_ID;

const GoogleOneTap = () => {
  const { googleAuthentication, error, data } = useGoogleAuthentication();
  const { showToast } = useToastContext();
  const router = useNavigate();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      console.log(data);
      dispatch({ type: "LOGIN", payload: data.user });
      showToast("Success", `${data.message}`, true);
      setTimeout(() => {
        router("/");
      }, 2000);
    }
    if (error) {
      showToast("Error", error, false);
    }
  }, [data, error, showToast, dispatch, router]);

  const handleSuccess = (credentialResponse) => {
    console.log("Google One Tap credential:", credentialResponse);
    googleAuthentication(credentialResponse.credential, "signup");
  };

  const handleError = () => {
    console.log("There is an error");
  };

  useEffect(() => {
    if (window.google && CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleSuccess,
        state_cookie_domain: '.litenote.app',  // your parent domain here
        allowed_parent_origin: [
  'https://litenote.app',
  'https://www.litenote.app',
  'http://localhost:5173',
  'http://localhost:3000'
                          ],

        cancel_on_tap_outside: false, // if you want to prevent cancel by tap outside
      });

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          handleError();
        }
      });
    } else {
      console.warn("Google Identity Services SDK not loaded");
    }
  }, []);

  return null; // no UI, handled by Google One Tap
};

export default GoogleOneTap;


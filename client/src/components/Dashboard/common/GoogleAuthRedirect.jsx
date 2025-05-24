// import { GoogleLogin} from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const GoogleAuth = ({ context, setLoading, width}) => {
//   const LOGINURI = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_REDIRECT_URI
//   const CLIENTID = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_CLIENT_ID
//   return (
//     <GoogleOAuthProvider clientId={CLIENTID}>
//      <GoogleLogin
//          theme={"outline"}
//          type='standard'
//          size="large"
//          text="continue_with"
//          shape="rectangular"
//          ux_mode='redirect'
//          width={width}
//          login_uri={LOGINURI}
//          logo_alignment='left'
//          context={context}
//          cancel_on_tap_outside={false}
//      />
//      </GoogleOAuthProvider>
//    );
//  };
// export default GoogleAuth;
import React, { useEffect, useRef } from 'react';

const GoogleAuthRedirect = ({ width }) => {
  const buttonDiv = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_REDIRECT_URI;

    // Wait for the Google script to load
    if (window.google && buttonDiv.current) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          console.log(response)
          // You don’t get here in redirect flow
        },
        ux_mode: 'redirect',
        login_uri: redirectUri,
      });

      window.google.accounts.id.renderButton(buttonDiv.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width : width,
        shape: 'rectangular',
      });
    }
  }, []);

  return <div ref={buttonDiv}></div>;
};

export default GoogleAuthRedirect;


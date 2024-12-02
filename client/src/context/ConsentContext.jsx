import { useState,
useEffect,
useRef,
createContext,
} from "react";
import gsap from "gsap";
import { checkCookie, getCookie, setCookie } from "../helpers/CookiesConfiguration";
export const ConsentContext = createContext()
export const ConsentContextProvider = ({ children}) => {
    const cookieConsentWrapper = useRef();
    const [cookieConsent, showCookieConsent] = useState(false)
    const [termsAndConditions, showTermsAndConditions] = useState(false)
    const [newsletter, showNewsLetter] = useState(false)

    const closeCookieConsent = () => {
        gsap.to(cookieConsentWrapper.current, {
            y: null,
            rotation: null,
            yoyo: null,
            repeat: null,
            ease: null,
            duration: null
        })
        showCookieConsent(false)
    }
    const closeNewsletter = () => {
        showNewsLetter(false)
        if(checkCookie("newsletter-mode")){
            return
        }
        setCookie("newsletter-mode", "false", 10)
    }
    useEffect(() => {
const displayNewsletter = () => {
    if(checkCookie("newsletter-mode")){
        if(getCookie("newsletter-mode") == "false"){
            showNewsLetter(true)
        }
    }
else{
    setCookie("newsletter-mode", "false", 10) //10 days, Newsletter consent will keep appearing for 10 days, if you do not accpt it
    showNewsLetter(true)
}
}
        const displayCookieConsent = () => {
            if(checkCookie("cookie-consent")) return
            showCookieConsent(true)
            setTimeout(() => {
                gsap.to(cookieConsentWrapper.current, {
                    y: 1,
                    rotation: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    duration: 0.4
                })
            }, 2000);
        }
        setTimeout(() => {
            displayNewsletter();
        }, 3000);
        setTimeout(() => {
displayCookieConsent();            
        }, 4000);

    }, [])
    return (
        <>
            <ConsentContext.Provider
            value={{
                cookieConsent,
                showCookieConsent,
                termsAndConditions,
                showTermsAndConditions,
                newsletter,
                showNewsLetter  ,
                closeCookieConsent,
                cookieConsentWrapper,
                closeNewsletter

            }}
            >
                {children}
            </ConsentContext.Provider>
        </>
    )
}
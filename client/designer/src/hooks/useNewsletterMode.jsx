import { useState, useEffect } from "react";
const useShowNewsletter = () => {
    const [newsletterMode, setNewsletterMode] = useState("")
    useEffect(() => {
  const handleColor = () => {
    let name = "newsletter-mode" + "=";
    let decodedCookie =  decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";")
    for(let i = 0; i < ca.length; i++){
      let c = ca[i];
      while(c.charAt(0) == " "){
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0){
   
        setNewsletterMode(false)
        return;
      }
    }
    setNewsletterMode(true)
    return undefined;
  }
  handleColor();
  window.addEventListener("resize", handleColor)

  return () => window.removeEventListener("resize", handleColor)
    }, [])
    return { newsletterMode }
}
export default useShowNewsletter
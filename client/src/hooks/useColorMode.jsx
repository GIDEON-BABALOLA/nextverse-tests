import { useState, useEffect } from "react";
const useColorMode = () => {
    const [colorMode, setColorMode] = useState("")
    useEffect(() => {
  const handleColor = () => {
    let name = "color-mode" + "=";
    let decodedCookie =  decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";")
    for(let i = 0; i < ca.length; i++){
      let c = ca[i];
      while(c.charAt(0) == " "){
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0){
    
        setColorMode(c.substring(name.length, c.length))
        return;
      }
    }
    setColorMode("")
    return undefined;
  }
  handleColor();
  window.addEventListener("resize", handleColor)

  return () => window.removeEventListener("resize", handleColor)
    }, [])
    return { colorMode }
}
export default useColorMode
import Verify from "../components/Account/Verify"
import { useEffect } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
const VerifyPage = () => {
    const { colorMode } = useThemeContext();
    useEffect(() => {
      if(colorMode == ""){
        document.body.classList.remove("dark-theme-variables")
      }
    switch (colorMode) {
    case "dark-mode":
      document.body.classList.remove("dark-theme-variables")
      break;
      case "light-mode":
          document.body.classList.remove("dark-theme-variables")
      break;
    }
    }, [colorMode])
  return (
    <>
 <section className="litenote-register-body">
    <Verify />
    </section>
    
    </>
  )
}

export default VerifyPage
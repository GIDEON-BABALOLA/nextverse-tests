import Login from "../components/Account/Login"
import "../styles/components/Account/login.css"
import { useEffect } from "react"
import { useThemeContext } from "../hooks/useThemeContext"

const LoginPage = () => {
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
    <section className="litenote-login-body">
    <Login />
    </section>
    </>
  )
}

export default LoginPage
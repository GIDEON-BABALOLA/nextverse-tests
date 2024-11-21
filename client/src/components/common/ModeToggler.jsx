
import { MdLightMode, MdDarkMode } from "react-icons/md"
import { useRef, useEffect } from "react"
import { useThemeContext } from "../../hooks/useThemeContext"
const ModeToggler = ({...props}) => {
  const { colorMode , dispatch} = useThemeContext()
  const themeRef = useRef();
  useEffect(() => {
    console.log(colorMode)
    console.log("mercy")
    if(colorMode == undefined || colorMode == ""){
      console.log("griezman")
      themeRef.current.querySelector('span:nth-child(1)').classList.add('active');  
    }
    // }
 

      
    
switch (colorMode) {
  
  case "dark-mode":
    console.log("I am dark mode")
    console.log(themeRef.current.querySelector('span:nth-child(2)').classList)
    themeRef.current.querySelector('span:nth-child(2)').classList.add('active');
    themeRef.current.querySelector('span:nth-child(1)').classList.remove('active');
    
    break;
    case "light-mode":
      console.log("I am light mode")

      
      themeRef.current.querySelector('span:nth-child(1)').classList.add('active');
      themeRef.current.querySelector('span:nth-child(2)').classList.remove('active');
      
    break;
}
    
  }, [colorMode])
  const themeMode = (e) => {
    let id;
    const correctId = e.currentTarget.closest('span').id;
        if(e.target.id == ""){
         id = correctId
        }
    switch (id) {
      case "dark-mode":
        dispatch({type : "dark-mode", payload : "dark-mode"})
        themeRef.current.querySelector('span:nth-child(1)').classList.remove('active');
        themeRef.current.querySelector('span:nth-child(2)').classList.add('active');
        break;
        case "light-mode":
        dispatch({type : "light-mode", payload : "light-mode"})
          themeRef.current.querySelector('span:nth-child(2)').classList.remove('active');
          themeRef.current.querySelector('span:nth-child(1)').classList.add('active');
          break;
      
    
      default:
        break;
    }
  }
  return (
    <div
    {...props}
     className="litenote-nav-theme-toggler "  style={{color : "white"}} ref={themeRef}>
    <span className="" id = "light-mode"  onClick={themeMode}>
    <MdLightMode />
    </span>
    <span id = "dark-mode" onClick={themeMode} >
    <MdDarkMode  />
      </span>
    </div>
  )
}

export default ModeToggler
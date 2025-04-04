import { useState, useEffect } from "react";
const useWindowScroll = () => {
    const [windowScroll, setWindowScroll] = useState({
        x : undefined,
        y : undefined
    })
    useEffect(() => {
  const handleScroll = () => {
    setWindowScroll({
        x : window.scrollX,
        y : window.scrollY
    })
  }
  handleScroll();
  window.addEventListener("scroll", handleScroll)

  return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return windowScroll
}
export default useWindowScroll
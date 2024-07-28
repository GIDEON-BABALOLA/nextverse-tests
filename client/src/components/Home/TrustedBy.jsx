
import { useRef, useEffect } from "react"
import visa from "../../assets/visa.svg"
import "../../styles/components/Home/trustedby.css"
export const TrustedBy = () => {
  const trustedBy = useRef();
  const logoSlide = useRef()

  useEffect(() => {
    const copy = logoSlide.current.cloneNode(true) /* Makes A Copy Of this div*/
    trustedBy.current.appendChild(copy)
  }, [])
  
  return (
    <div className="trusted-by" ref={trustedBy}>
        <div className="trusted-by-logo-slide" ref={logoSlide}>
<img src={visa}/>
<img src={visa}/>
<img src={visa}/>
<img src={visa}/>
<img src={visa}/>
<img src={visa}/>
<img src={visa}/>
<img src={visa}/>
        </div>
    </div>
  )
}

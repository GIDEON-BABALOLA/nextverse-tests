
import { useRef, useEffect } from "react"
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
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
<img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1733257541/Assets/images/visa_hgoeyj.svg"}/>
        </div>
    </div>
  )
}

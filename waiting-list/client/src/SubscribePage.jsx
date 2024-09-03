import axiosConfig from "./axiosConfig"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
const SubscribePage = ({ setAdmin }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
  const joinWaitingList = async () => {
  if(validateEmail(email)){
    setIsLoading(true)
    try {
      const response = await axiosConfig.post("/subscribe-user", {
        email : email
    },
    {
        signal : AbortSignal.timeout(10000) //times out after 10 seconds
    }
    )
    if(response.data.message == "admin"){
      navigate("/waiting-list")
      setAdmin(true)
      return;
    }
    if(response && response.data){
      setAdmin(false)
      setIsLoading(false)
      toast.success("You Have Subscribed Successfully")
      return;
    }
    } catch (error) {
      setIsLoading(false)
      if(error.message == "canceled"){
        toast.error("Your Request Has Timed Out")
                    }else{
                      toast.error( error.response.data.message)
                    setIsLoading(false)
                }
    }
  }else{
toast.success("Please Enter A Correct Email")
  }
  }
  return (
    <>
        <section className='waiting-list-section' style={{color : "white"}}>
    <Toaster />
    <div className="background-logos"></div>
    <div className="container">

     
        <h1>Lite Note</h1>
        <p> Lite Note! We are crafting powerful features to boost your creativity and amplify your voice  be among the first to experience the future of online publishing!</p>
        <div className="form-group">
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" id="email" placeholder="Enter your email address" required />
        </div>
        <button
        onClick={joinWaitingList}
        style={{backgroundColor : isLoading && "#e7675e", color : isLoading && "white"}}
        >
        <span className="maracana">
       { isLoading && <div className="box-loader-container">
    <div className="box-loader"></div>
    </div>
       }
        
        Join the Waiting List
        
        </span>
 
        </button>
        <p className="success-message" id="successMessage">Thanks for joining! We will keep you updated.</p>
    </div>
</section>
      <div style={{color : "white"}}>
<b>© 2024 Next Verse. All rights reserved.</b>
</div>
    </>

  )
}

export default SubscribePage
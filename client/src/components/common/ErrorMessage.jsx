
import { MdCloudOff, MdOutlineRefresh } from "react-icons/md"
import "../../styles/components/common/error-message.css"
const ErrorMessage = ({ title, message, height}) => {
  return (
     <section className="something-went-wrong"
     style={{height : `${height}vh`}}
     >
 <MdCloudOff size={100} color="#777777"/>
 <div><h2>{title}</h2></div>
 <div>
 {message}</div>
 <div><button className="offline-button"
 onClick={() => location.reload()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
</section>
  )
}

export default ErrorMessage
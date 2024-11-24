
import { MdCloudOff, MdOutlineRefresh, MdOutlineTimerOff } from "react-icons/md"
import { GiSandsOfTime } from 'react-icons/gi';
import { BiWifiOff } from "react-icons/bi"
import "../../styles/components/common/error-message.css"
import { FaHourglass, FaHourglassEnd } from 'react-icons/fa';
const ErrorMessage = ({ title, type, message, height, fireClick}) => {
  return (
     <section className="something-went-wrong"
     style={{height : `${height}vh`}}
     >
     {
      type == "ERR_CANCELED" ?
      <MdOutlineTimerOff size={100} color="#777777" />
      :
      type == "ERR_NETWORK"
      ?
      <BiWifiOff size={100} color="#777777"/>
 : 
 <MdCloudOff size={100} color="#777777"/>


     }
 <div><span className="our-error-title">{title}
 
 </span>

 </div>
 <div className="our-error-title-message">
 {message}</div>
 <div><button className="offline-button"
 onClick={() => fireClick()}
 ><MdOutlineRefresh size={20}/> Refresh</button></div>
</section>
  )
}

export default ErrorMessage
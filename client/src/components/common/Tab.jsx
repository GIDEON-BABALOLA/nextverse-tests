
import { useRef, useState} from "react"
import  useWindowSize  from "../../hooks/useWindowSize"
import "../../styles/components/common/tab.css"
import Dropdown from "./Dropdown"
const Tab = ({ setTab, tabs, scale,  labelWidth, ...props}) => {
    const [slideDistance, setSlideDistance] = useState(0)
    const { width } = useWindowSize()
    const tabRef = useRef()
    const clickMe = (e) => {
      console.log(e.target)
        const tab = e.target.innerText.toLowerCase()
        const optionMapping = {}
        const distanceMap = {}
        Object.entries(tabs).map(([key, value], index) => {
            optionMapping[key] = value
            distanceMap[key] = index * labelWidth
        })
const selectedOption = optionMapping[tab];
setSlideDistance(distanceMap[tab])
        setTab(prevState => ({
      ...Object.keys(prevState)
            .filter(key => key !== selectedOption) // Reset all others
            .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
            [tab]: true
         }))
    }
  return (
    <>
    { width < 1200 ? 
    <Dropdown tabs={tabs} setTab={setTab} scale={scale}/>
    :
    <div className="bookmark-tabs-wrapper" {...props}>
    <div className="bookmark-tabs"
ref={tabRef}
>
  {   Object.entries(tabs).map(([key], index) => (
    <label htmlFor={`tab${index}`}
    className="tab-label"
    key={key}
        style={{color : 
        
        tabs[key] == true ? "var(--color-primary)" : "var(--general-tabs-color)", width : `${labelWidth}px` }}
         onClick={clickMe}>{key[0].toUpperCase() + key.slice(1)}</label>
  ))}      
        <div className="glider" style={{   transform: `translateX(${slideDistance}px)`,
         width : `${labelWidth}px`
        }}><span>{
          Object.keys(tabs).find(key => tabs[key] === true)[0].toUpperCase()
           +Object.keys(tabs).find(key => tabs[key] === true).slice(1)
           }</span></div>
    </div>
</div>
    }
</>
  )
}

export default Tab
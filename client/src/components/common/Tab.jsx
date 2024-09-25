
import { useRef, useState} from "react"
import  useWindowSize  from "../../hooks/useWindowSize"
import Dropdown from "./Dropdown"
const Tab = ({ setTab, tabs, ...props}) => {
    const [slideDistance, setSlideDistance] = useState(0)
    const { width } = useWindowSize()
    const tabRef = useRef()
    const clickMe = (e) => {
        const tab = e.target.innerText.toLowerCase()
        const optionMapping = {}
        const distanceMap = {}
        Object.entries(tabs).map(([key, value], index) => {
            optionMapping[key] = value
            distanceMap[key] = index * 200
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
    <Dropdown tabs={tabs} setTab={setTab} />
    :
    <div className="bookmark-tabs-wrapper" {...props}>
    <div className="bookmark-tabs"
ref={tabRef}
>
  {   Object.entries(tabs).map(([key, value], index) => (
    <label htmlFor={`tab${index}`}
    key={key}
        style={{color : 
        tabs[key] == true && "var(--color-primary)" }}
         onClick={clickMe}>{key[0].toUpperCase() + key.slice(1)}</label>
  ))}
        <div className="glider" style={{   transform: `translateX(${slideDistance}px)`}}></div>
    </div>
</div>
    }
</>
  )
}

export default Tab
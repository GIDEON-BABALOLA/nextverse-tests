
import { useRef, useState} from "react"
import  useWindowSize  from "../../hooks/useWindowSize"
import Dropdown from "../../components/common/Dropdown"
import "../../styles/components/common/tab.css"
const PublishTab = ({ setTab, tabs, scale,  labelWidth, counts, slideDistance, setSlideDistance, ...props}) => {
    const { width } = useWindowSize()
    const tabRef = useRef()
    const clickMe = (e) => {
        const tab = e.target.innerText.toLowerCase()
        console.log(tab)
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
    <Dropdown tabs={tabs} setTab={setTab} scale={scale} counts={counts}/>
    :
    <div className="container stories-tabs-wrapper" {...props}>
    <div className="publish-tabs"
ref={tabRef}
>
  {   Object.entries(tabs).map(([key], index) => (
    <label htmlFor={`tab${index}`}
    className="tab"
    key={key}
        style={{color : 
        
        tabs[key] == true ? "var(--color-primary)" : "var(--general-tabs-color)", width : `${labelWidth}px` }}
         onClick={clickMe}>{key[0].toUpperCase() + key.slice(1)}</label>
  ))}      
        <div className="glider" style={{   transform: `translateX(${slideDistance}px)`,
         width : `${labelWidth}px`
        }}>
<span>{
          Object.keys(tabs).find(key => tabs[key] === true)[0].toUpperCase()
           +Object.keys(tabs).find(key => tabs[key] === true).slice(1)
           }</span>
                            {  Object.keys(tabs).find(key => tabs[key] === true) !== "write" && <span className="publish-tabs-number"
     style={{ fontSize : "1rem" }}
     >{counts[Object.keys(tabs).find(key => tabs[key] === true)]} </span>
                            }

        </div>
  
</div>
</div>
    }
</>
  )
}

export default PublishTab
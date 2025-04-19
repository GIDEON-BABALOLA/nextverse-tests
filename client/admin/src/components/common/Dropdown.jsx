import  { useState, useRef} from 'react'
import { FaAngleDown } from 'react-icons/fa'

const Dropdown = ({ tabs, setTab, scale, counts, ...props}) => {
    const selectMenu = useRef() 
    const list = useRef()
    const selectButton = useRef()
    const [active, setActive] = useState(false)
 
    const chooseOption = (e) => {
        const tab = e.target.innerText.toLowerCase().split("\n")[0]
     if(e.target.className == "dropdown-stories-select-notification"){
      return
     }
        const optionMapping = {}
        Object.entries(tabs).map(([key, value]) => {
            optionMapping[key] = value
        })
const selectedOption = optionMapping[tab];
        setTab(prevState => ({
      ...Object.keys(prevState)
            .filter(key => key !== selectedOption) // Reset all others
            .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
            [tab]: true
         }))
        setActive(!active)
        selectButton.current.innerText = e.target.innerText.split("\n")[0]
        list.current.style.padding = "20px";
        setTimeout(() => {
            list.current.style.display = "none";
          }, 500);
       
      }
      const openOption = () => {
        list.current.style.display = "block";
        setActive(!active)
        if(active === true){
            list.current.style.padding = "20px";
            list.current.style.display = "block";
          setTimeout(() => {
            list.current.style.display = "none";
          }, 500);
        }
      }
  return (
<div 
className={`litenote-stories-select-menu  ${active ? 'active' : ''}`} ref={selectMenu}
style={{marginBottom : "20px"}}
{...props} 
>
<div className="litenote-stories-select-btn"  onClick={openOption}>
<span className="litenote-stories-sBtn-text" ref={selectButton} >Filter By Category</span>
<FaAngleDown  className="litenote-angle-down"/>
</div>
<ul 
className={`litenote-stories-options
   ${active ? 'show' : 'close'}`} 
   
   ref={list}
   {...props}
   >
{ Object.entries(tabs).map(([key, value], index) => (
    <li
    key={index}
     className="litenote-stories-option" 
     onClick={chooseOption}>

<span className="litenote-stories-option-text">{key[0].toUpperCase() + key.slice(1)}</span>
{scale &&  

<>
{counts ? 
<>
{ key == Object.keys(tabs).find(key => tabs[key] === true) ?
  <span className="publish-tabs-number"
  style={{ fontSize : "1rem" }}
  >{counts[Object.keys(tabs).find(key => tabs[key] === true)]} </span>
  : 
  <span className="publish-tabs-number"
  style={{ fontSize : "1rem" }}
  >0</span>

}
</>
  
:
<span className="dropdown-stories-select-notification"
     style={{backgroundColor : "var(--primary-cocolor)", color : "#ffff", fontSize : "1rem" }}
     >3</span>
}
</>
}
    </li>
))}                             
</ul>
    </div>
  )
}

export default Dropdown
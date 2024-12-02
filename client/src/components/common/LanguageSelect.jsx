import "../../styles/components/common/language-select.css"
import { FaSearch, FaAngleDown } from "react-icons/fa"
import fr from "../../assets/countryflags/fr.png"
import us from "../../assets/countryflags/us.png"
import de from "../../assets/countryflags/de.png"
import gb from "../../assets/countryflags/gb-eng.png"
import es from "../../assets/countryflags/es.png"
import it from "../../assets/countryflags/it.png"
import pt from "../../assets/countryflags/pt.png"
import cn from "../../assets/countryflags/cn.png"
import sa from "../../assets/countryflags/sa.png"
import india from "../../assets/countryflags/in.png"
import jp from "../../assets/countryflags/jp.png"
import nl from "../../assets/countryflags/nl.png"
import { useRef, useState, useEffect } from "react"
const LanguageSelect = () => {
  const[searchInput, setSearchInput] = useState()
  let featureDevelopment = false
  const [data, setData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const languagePicked = useRef()
  const selectOptions = useRef()
const languageData = [ {
  name : "English(US)",
  flag  : us},
{
  name : "English(UK)",
  flag : gb
},
{
  name : "French",
  flag : fr
},
{
name : "German",
  flag : de
},
{
name : "Spanish",
flag : es
},
{
name : "Italian",
flag : it
},
{
name : "Portugese",
flag : pt
},
{
name : "Chinese",
flag : cn
},
{
name : "Hindi",
flag : india
},
{
name : "Arabic",
flag : sa
},
{
  name : "Japanese",
  flag : jp
  },
  {
    name : "Dutch",
    flag : nl
    }]

  useEffect(() => {
 setData(languageData)
 setSearchResults(languageData)
  }, [])

  useEffect(() => {
    scrollToTop();
  }, [searchInput]);
  const scrollToTop = () => {
    if (selectOptions.current) {
      selectOptions.current.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional smooth scrolling
      });
    }
  };
const pickLanguage = (e) => {
  languagePicked.current.innerText = e.target.innerText
  selectWrapper.current.classList.remove("active")
  setSearchInput("") 
}
const searchLanguage = (e) => {
    const value = e.target.value.trim()
    setSearchInput(value)
    if(!value){
        return setSearchResults(data)
    }else{
        setSearchResults(searchArray(value))
      
    }
  }
const searchArray = (search) => {
    //Merge Array without repeating the elements in the array more than once
    const mergeArray = (news, olds) => [...new Set([...news, ...olds])]
    return mergeArray(resultsArray(search), data)
}
const resultsArray = (search) => {
    const resultsArray = data.filter((content) => content.name.toLowerCase().includes(search.toLowerCase())
 ) //Returns Boolean
 if(resultsArray.length > 0) {
  return resultsArray
 }else{
  setSearchResults([])
 }


}
 
  const selectWrapper = useRef()
  const showSelection = () => {
    selectWrapper.current.classList.toggle("active")    
  }
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"))
    return <span>{
      parts.map((part, index) => {
        return part.toLowerCase() === searchInput.toLocaleLowerCase() ? (
          <b key={index}>{part}</b>
        ) : (
          part
        )
      })
    }
    </span>
      }
  return (
   
<div className="country-select-wrapper" ref={selectWrapper}>
    <div className="country-select-select-btn" onClick={showSelection}>
    <span ref={languagePicked}>Select Language</span>
<FaAngleDown />
    </div>
  { featureDevelopment ? 
    <span style={{fontFamily : "Poppins"}}>
    Pls Bear With Us, This Feature Is Still In Development
    </span>
  :
   <div className="country-select-content">
<div className="country-select-search">
<FaSearch />
<input type="text" placeholder="Search Language" onChange={searchLanguage} value={searchInput}/>
</div>
<ul className="country-select-options" ref={selectOptions}>

{ searchResults.length > 0 ? searchResults.map((content, index) => (
  <li key={index} onClick={pickLanguage}>
  { searchInput ? getHighlightedText(content.name, searchInput) : content.name}
  <img src={content.flag} width={"10%"}  
  /></li>
)) : 
<li className="select-not-found" style={{fontSize : "17px"}}>
Oops! Country not found
</li>}

</ul>

    </div>

  }
</div>
    
  )
}

export default LanguageSelect
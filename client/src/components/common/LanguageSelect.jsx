import "../../styles/components/common/language-select.css"
import { FaSearch, FaAngleDown } from "react-icons/fa"
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
  flag  : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240294/Assets/Flags/us_g7f8fy.png"
},
{
  name : "English(UK)",
  flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240274/Assets/Flags/gb_wk13vw.svg"
},
{
  name : "French",
  flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240270/Assets/Flags/fr_mtj65f.png"
},
{
name : "German",
  flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240265/Assets/Flags/de_debhlf.png"
},
{
name : "Spanish",
flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240268/Assets/Flags/es_yz3eno.png"
},
{
name : "Italian",
flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240279/Assets/Flags/it_vq17su.png"
},
{
name : "Portugese",
flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240286/Assets/Flags/pt_swvfcr.png"
},
{
name : "Chinese",
flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240265/Assets/Flags/cn_hdlygw.png"
},
{
name : "Hindi",
flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240276/Assets/Flags/in_zvyuyn.png"
},
{
name : "Arabic",
flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240291/Assets/Flags/sa_c7wgsb.png"
},
{
  name : "Japanese",
  flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240281/Assets/Flags/jp_qx05u7.png"
  },
  {
    name : "Dutch",
    flag : "https://res.cloudinary.com/doctr0fct/image/upload/v1733240283/Assets/Flags/nl_ap18pz.png"
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
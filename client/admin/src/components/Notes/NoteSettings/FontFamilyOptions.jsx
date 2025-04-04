import { FaCheck } from "react-icons/fa"
import { FaArrowLeft } from "react-icons/fa"
import NoteSettings from "../NoteSettings";
const FontFamilyOptions = ({ slideLine, setNoteSettings, noteSettings }) => {
    const handleFontFamily = (e) => {
const allowedFonts = ["Poppins", "Roboto", "Fira Code", "Montserrat", "Noto Sans Georgian"];
if(allowedFonts.includes(e.target.innerText)){
    setNoteSettings((prevState) => {
        return {
            ...prevState, fontFamily : e.target.innerText
        }
    })
}
    }
  return (
    <section
    className="settings-main"
     style={{display : "flex", flexDirection : "column",
     cursor : "pointer"
     }}>
           <div style={{display : "flex", gap : "15px", flexDirection : "column", justifyContent : "space-between"}}>
           <div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
        
        <span>
        <FaArrowLeft onClick={(e) => slideLine(e) } id="Font Family"/>
        </span>
           
           <span style={{display :"flex", justifyContent : "center", alignItems : "center", width : "100%"
}}>Font</span>
           </div>
<div style={{display : "flex", flexDirection : "column", alignItems :"flex-start",
justifyContent : "space-between", gap : "8px"
}}
className="pellerd" 
>
<div style={{display : "flex", alignItems : "center", gap : "10px"}}>
{noteSettings["fontFamily"] == "Poppins" ? <FaCheck />  : <>&nbsp;&nbsp;&nbsp;</>}
 <span onClick={(e) => handleFontFamily(e)} >Poppins</span>
</div>
<div  style={{display : "flex", alignItems : "center", gap : "10px"}}>
{noteSettings["fontFamily"] == "Noto Sans Georgian" ? <FaCheck />  : <>&nbsp;&nbsp;&nbsp;</>}
<span onClick={(e) => handleFontFamily(e)}  >Noto Sans Georgian</span>
</div>
<div style={{display : "flex", alignItems : "center", gap : "10px"}}>
{noteSettings["fontFamily"] == "Roboto" ? <FaCheck />  : <>&nbsp;&nbsp;&nbsp;</>}
<span onClick={(e) => handleFontFamily(e)}  >Roboto</span>
</div>
<div style={{display : "flex", alignItems : "center", gap : "10px"}}>
{noteSettings["fontFamily"] == "Fira Code" ? <FaCheck />  : <>&nbsp;&nbsp;&nbsp;</>}
<span onClick={(e) => handleFontFamily(e)}  >Fira Code</span>
</div>
<div style={{display : "flex", alignItems : "center", gap : "10px"}}>
{noteSettings["fontFamily"] == "Montserrat" ? <FaCheck />  : <>&nbsp;&nbsp;&nbsp;</>}
<span onClick={(e) => handleFontFamily(e)}  >Montserrat</span>
</div>
</div>
</div> 
     </section>
  )
}

export default FontFamilyOptions
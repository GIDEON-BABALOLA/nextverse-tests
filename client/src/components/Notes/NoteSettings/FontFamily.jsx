import { FaAngleRight } from "react-icons/fa"
const FontFamily = ({ slideLine }) => {
  return (
<section
    className="settings-main"
     style={{display : "flex", flexDirection : "column",
     cursor : "pointer"
     }}
     
     >

<div
 onClick={(e) => slideLine(e) }
 id="FontFamilyOptions"
 style={{display
 : "flex", flexDirection : "row", width : "100%", justifyContent : "space-between", alignItems : "center",
 border : "1px solid black", padding : "8px 10px", borderRadius : "5px", marginTop : "10%"}}>
<div style={{display : "flex", flexDirection  :"column", alignItems  :"flex-start", justifyContent : "flex-start"}}>
<span style={{color : "#777777"}}>Font</span>
<span>Poppins</span>
</div>
<div>
<FaAngleRight style={{fontSize : "1.5rem"}}/>
</div>
 
</div>
    </section>
  )
}

export default FontFamily
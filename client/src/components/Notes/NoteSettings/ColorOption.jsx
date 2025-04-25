
import { FaAngleRight } from "react-icons/fa"
const ColorOption = ({ slideLine, setColorType}) => {
  return (
<section className="settings-main"
     style={{display : "flex", flexDirection : "column",
     cursor : "pointer",
     justifyContent : "space-between",
     gap : "20px"
     }}>
   <div
 onClick={(e) => {slideLine(e, 1); setColorType("Highlight Color") }}
 id="ColorOptionList"
 style={{display
 : "flex", flexDirection : "row", width : "100%", justifyContent : "space-between", alignItems : "center",
 border : "1px solid black", padding : "8px 10px", borderRadius : "5px", marginTop : "5%"}}>
<div style={{display : "flex", flexDirection  :"column", alignItems  :"flex-start", justifyContent : "flex-start"}}>
<span >Highlight Color</span>
<span style={{color : "#777777"}}>#FFFF00</span>
</div>
<div>
<FaAngleRight style={{fontSize : "1.5rem"}}/>
</div>
 
</div>
   <div
 onClick={(e) => {slideLine(e); setColorType("Text Color") }}
 id="ColorOptionList"
 style={{display
 : "flex", flexDirection : "row", width : "100%", justifyContent : "space-between", alignItems : "center",
 border : "1px solid black", padding : "8px 10px", borderRadius : "5px"}}>
<div style={{display : "flex", flexDirection  :"column", alignItems  :"flex-start", justifyContent : "flex-start"}}>
<span>Text Color</span>
<span style={{color : "#777777"}}>#000000</span>
</div>
<div>
<FaAngleRight style={{fontSize : "1.5rem"}}/>
</div>
 
</div>

       
    </section>
  )
}

export default ColorOption
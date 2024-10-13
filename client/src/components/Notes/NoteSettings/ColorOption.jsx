
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
{/* <section style={{display :"flex", flexDirection : "column", justifyContent : "space-around"}}>
<div style={{ display : "flex", alignSelf : "left",}}>
  Text Color
</div>

    <div
    className="settings-color-section"
    style={{marginTop : "2%"}}
    >
                  {colors.map((color, index) => (
          <>
          <div
          key={index}
        className="sticky-notes-color"
        style={{ backgroundColor: color.colorHeader,
        border : "3px solid #e5e5e5"
         }}
        onClick={ () => {}}
    ></div>
    <FaCheck color="white" size={20} style={{position : "absolute"}}/>
</>

        ))}
        </div>
</section> */}


{/* 
<section>
<div style={{ display : "flex", alignSelf : "left",}}>
  Highlight Color
</div>

    <div
    className="settings-color-section"
    style={{marginTop : "2%"}}
    >
                  {colors.map((color, index) => (
          <>
          <div
          key={index}
        className="sticky-notes-color"
        style={{ backgroundColor: color.colorHeader,
        border : "3px solid #e5e5e5"
         }}
        onClick={ () => {}}
    ></div>
    <FaCheck color="white" size={20} style={{position : "absolute"}}/>
</>

        ))}
        </div>
</section> */}
       
    </section>
  )
}

export default ColorOption
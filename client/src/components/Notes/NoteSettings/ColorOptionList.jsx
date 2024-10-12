
import { FaCheck } from "react-icons/fa"
import colors from "../../../assets/colors.json"
const ColorOptionList = ({colorType }) => {
  return (
   <section>
    <div style={{ display : "flex", alignSelf : "left",}}>
  {colorType}
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
</div>
   </section>
  )
}

export default ColorOptionList
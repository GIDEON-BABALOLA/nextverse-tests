import { SlMenu } from "react-icons/sl";
const LineSizing = ({noteSettings, setNoteSettings}) => {
    const handleLineHeight = (e) => {
        switch (e.target.id) {
          case "small":
            setNoteSettings((prevState) => {
              return {...prevState, lineHeight : 2.5}
            })
            break;
            case "large":
              setNoteSettings((prevState) => {
                return {...prevState, lineHeight : 3.5}
              })
              break
              case "extralarge":
              setNoteSettings((prevState) => {
                return {...prevState, lineHeight : 4.5}
              })
            break;
        }
                }
  return (
    <section className="settings-main line-sizing">
    <div style={{display : "flex", alignItems : "center", justifyContent : "center",
    marginTop : "10%",
    gap : "30px",
     padding : "0px 90px"
     
    }}>
    <span 
    style={{
      padding : "10px",
      borderRadius : "3px",
      cursor : "pointer",
    }}
  
    className={`  ${noteSettings["lineHeight"] == 2.5 && "active" }`}  >
    <SlMenu 
      id="small"
      size={30} onClick={handleLineHeight} />
    </span>
    <span 
       style={{
      padding : "10px",
      borderRadius : "3px",
      cursor : "pointer",
    }}
    
    className={`  ${noteSettings["lineHeight"] == 3.5 && "active" }`} onClick={handleLineHeight} >
    <SlMenu
    id="large"
     size={50} onClick={handleLineHeight}/>
    </span>
    <span 
       style={{
      padding : "10px",
      borderRadius : "3px",
      cursor : "pointer",
    }}
   
    className={`  ${noteSettings["lineHeight"] == 4.5 && "active" }`} onClick={handleLineHeight} >
  <SlMenu 
   id="extralarge"
  size={60} onClick={handleLineHeight}/>
    </span>
    </div>

</section>
  )
}

export default LineSizing